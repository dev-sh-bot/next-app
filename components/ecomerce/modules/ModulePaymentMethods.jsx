import React, { useEffect, useState } from 'react';
import { notification, Radio } from 'antd';
import { useRouter } from 'next/router';
import useEcomerce from '~/hooks/useEcomerce';
import { connect } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import notificationAlert from '~/components/utils/notificationAlert';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModulePaymentMethods = ({ ecomerce, shipping }) => {
    const { products, getProducts } = useEcomerce();
    const [FinalOrder, setFinalOrder] = useState([]);
    const [Total, setTotal] = useState([]);
    const Router = useRouter();
    const { query } = Router
    console.log("Router", Router)

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    // let amount;
    useEffect(() => {
        if (products && products.length > 0) {
            let amount = calculateAmount(products)
            setTotal(amount)
        }

        const OrderAddressfeilds = JSON.parse(localStorage.getItem("realBazarUserAddress"));

        let order = [];
        products?.map((item) => {
            console.log("item", item)
            if (order.length) {
                order.map(ord => {
                    if (ord.sellerId === item.shop.id) { // seller id matched
                        ord.product.push({ id: item.id, product_selected_qty: item.quantity, size: item.variation[0].size, product_price: item.variation[item.variationIndex].price })
                    } else {
                        order.push({
                            name: OrderAddressfeilds.username,
                            phone: OrderAddressfeilds.phone,
                            address: OrderAddressfeilds.address,
                            email: OrderAddressfeilds.EmailPhone,
                            sellerId: item.shop.id,
                            product: [{ id: item.id, product_selected_qty: item.quantity, size: item.variation[0].size, product_price: item.variation[item.variationIndex].price }]
                        })
                    }
                })
            } else {
                order.push({
                    name: OrderAddressfeilds.username,
                    phone: OrderAddressfeilds.phone,
                    address: OrderAddressfeilds.address,
                    email: OrderAddressfeilds.EmailPhone,
                    sellerId: item.shop.id,
                    product: [{ id: item.id, product_selected_qty: item.quantity, size: item.variation[0].size, product_price: item.variation[item.variationIndex].price }]
                })
            }
        })
        setTimeout(() => {
            setFinalOrder(order)
        }, 1000);
    }, [products])

    useEffect(() => {
        if (FinalOrder && FinalOrder.length > 0) {
            if (query.response_code == "000" || query.status == "0000") {
                if (query.pp_TxnRefNo || query.orderRefNumber) {
                    paymentorCOD(null, FinalOrder, query.pp_TxnRefNo ? query.pp_TxnRefNo : query.orderRefNumber, query.pp_TxnRefNo ? "jazzcash" : "easypaisa", query.response_code, query.response_message ? query.response_message : query.description);
                }
            } else if (query.response_message) {
                // notificationAlert("warning", "Opps!", query.response_message);
                // pay_status: "unpaid"
                let forder = FinalOrder;
                forder[0].pay_status = "unpaid"
                paymentorCOD(null, forder, query.pp_TxnRefNo ? query.pp_TxnRefNo : query.orderRefNumber, query.pp_TxnRefNo ? "jazzcash" : "easypaisa");
            } else if (query.description) {
                // notificationAlert("warning", "Opps!", query.description);
                let forder = FinalOrder;
                forder[0].pay_status = "unpaid"
                paymentorCOD(null, forder, query.pp_TxnRefNo ? query.pp_TxnRefNo : query.orderRefNumber, query.pp_TxnRefNo ? "jazzcash" : "easypaisa");
            }
        }
    }, [FinalOrder, query])


    useEffect(() => {
        setTimeout(function () {
            window.ReactNativeWebView?.postMessage(JSON.stringify(query))
        }, 2000)
        console.log("window.ReactNativeWebView", window.ReactNativeWebView)
    }, [query])

    const [method, setMethod] = useState(3);

    function handleChangeMethod(e) {
        setMethod(e.target.value); //e.target.value
    }

    const { addItem } = useEcomerce();

    function handleCartEmpty() {
        addItem("", false, 'emptyCart');
    }

    const CommingSoon = () => {
        notificationAlert("info", "Comming Soon!", "");
    }

    const [Url, setUrl] = useState("")
    const [ErrList, setErrList] = useState([])
    const [CheckoutData, setCheckoutData] = useState([])

    async function JazzCash(e) {
        e.preventDefault();
        const url = `/jazzcash/checkout`
        let ls = localStorage.getItem("realBazarUsertoken");
        if (ls === null) {
            notificationAlert("warning", "Opps!", "please Login first");
            Router.push("/account/login");
        } else {
            const Data = await ProductRepository.checkout(url, Total)
            console.log("checkout", Data)
            if (Data.status) {
                // const ErrList = Object.keys(Data.data);
                setUrl(Data.url)
                setErrList(Object.keys(Data.data))
                setCheckoutData(Data.data)

                const jazzCashbutton = document.getElementById("submitJazzCashForm");
                // console.log("jazzCashbutton",jazzCashbutton)
                jazzCashbutton.click()
                // notificationAlert("warning", "Opps", Data.data[e]);
            }
        }
    }

    async function Easypaisa(e) {
        e.preventDefault();
        let ls = localStorage.getItem("realBazarUsertoken");
        const url = `/easypaisa/checkout`
        if (ls === null) {
            notificationAlert("warning", "Opps!", "please Login first");
            Router.push("/account/login");
        } else {
            const Data = await ProductRepository.checkout(url, Total)
            // console.log("checkout", Data)
            if (Data.status) {
                window.location.assign(Data.url)
                // notificationAlert("warning", "Opps", Data.data[e]);
            }
        }
    }

    async function paymentorCOD(e, paymentMethod, refNO, paywith,response_code,response_message) {
        if (e) {
            e.preventDefault();
        }
        let ls = localStorage.getItem("realBazarUsertoken");
        if (ls === null) {
            notificationAlert("warning", "Opps!", "please Login first");
            Router.push("/account/login");
        } else {
            const Data = await ProductRepository.placedOrder(
                {
                    order: paymentMethod ? paymentMethod : FinalOrder,
                    payment_method: paywith,
                    txt_refno: refNO ? refNO : "",
                    response_code: response_code,
                    response_message: response_message
                })
            console.log("orderProductStatus", Data)
            if (Data.status) {
                notificationAlert("success", "Congratulations", Data.Message);
                handleCartEmpty();
                // Router.push('/account/payment-success');
                // Router.push('/');
            } else {
                notificationAlert("error", "Opps!", Data.Message);
            }
        }
    }

    return (
        <>
            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method">
                <div className="ps-block__header">
                    <Radio.Group
                        onChange={(e) => handleChangeMethod(e)}
                        value={method}>
                        {/* <Radio value={1}>COD</Radio> */}
                        {/* <Radio value={2}>Card</Radio> */}
                        <Radio value={3}>Easy Paisa</Radio>
                        <Radio value={4}>Jazz Cash</Radio>
                    </Radio.Group>
                </div>
                <div className="ps-block__content">
                    {method === 1 ? (
                        <div className="ps-block__tab">
                            {/* <div className="form-group">
                                <label>Account Number</label>
                                <input type="text" className="form-control" />
                            </div> */}
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    onClick={(e) => paymentorCOD(e, FinalOrder, "", "cash on delivery")}>
                                    Process with Cash on Delivery
                                </button>
                            </div>
                        </div>

                    ) : (method == 2 ? (
                        <div className="ps-block__tab">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Card Holders</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>Expiration Date (MM/YY)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="01/21"
                                        />
                                    </div>
                                </div>
                                <div className=" col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    onClick={CommingSoon}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (method == 3 ? (
                        <div className="ps-block__tab">
                            {/* <div className="form-group">
                                <label>Account Number</label>
                                <input type="text" className="form-control" />
                            </div> */}
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    id="submitPaymentMethod"
                                    name='pay'
                                    onClick={(e) => Easypaisa(e)}
                                >
                                    Process with Easy Paisa
                                </button>
                            </div>
                        </div>
                    ) : (
                        // <div className="ps-block__tab">
                        //     <a
                        //         className="ps-btn"
                        //         href="https://www.paypal.com/"
                        //         target="_blank">
                        //         Process with Paypal
                        //     </a>
                        // </div>
                        <div className="ps-block__tab">
                            {/* <div className="form-group">
                                <label>Account Number</label>
                                <input type="text" className="form-control" />
                            </div> */}
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    onClick={JazzCash}
                                >
                                    Process with Jazz Cash
                                </button>
                            </div>
                        </div>
                    )))}
                    <iframe id="easypay-iframe" name="easypay-iframe" src="about:blank" width="100%" height="500px" />
                </div>
            </div>

            <form action={Url} method="post">
                {ErrList.map((e, i) => (
                    <input type="hidden" key={i} name={e} value={CheckoutData[e]} />
                ))}

                <button id='submitJazzCashForm' hidden>submit form</button>
            </form>
        </>
    );
};

export default connect((state) => state)(ModulePaymentMethods);
