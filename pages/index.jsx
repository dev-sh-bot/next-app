import PageContainer from '~/components/layouts/PageContainer';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import HeaderMobileTechnology from '~/components/shared/headers/HeaderMobileTechnology';
import HeaderTechnology from '~/components/shared/headers/HeaderTechnology';
import { Tabs } from 'antd';
import Retailer from './home/retailer';
import Wholesaler from './home/wholesaler';
import useEcomerce from '~/hooks/useEcomerce';
import notificationAlert from '~/components/utils/notificationAlert';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

const HomeTechnologyPage = ({ ecomerce, shipping }) => {
    const headers = (
        <>
            <HeaderTechnology />
            <HeaderMobileTechnology />
        </>
    );

    const footer = <FooterSecond classes="ps-footer--technology" />;
    const { TabPane } = Tabs;

    // order work

    const { products, getProducts } = useEcomerce();
    const [FinalOrder, setFinalOrder] = useState([]);
    const [Total, setTotal] = useState([]);
    const Router = useRouter();
    const { query } = Router
    console.log("Router", Router)
    // console.log(products)

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

    function handleCartEmpty() {
        addItem("", false, 'emptyCart');
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
    // order work

    return (
        <PageContainer
            header={headers}
            footer={footer}
            title="Wholesale Marketplace">
            <div className="row">
                <div className="col-md-12">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Retail Products" key="1">
                            <Retailer />
                        </TabPane>
                        <TabPane tab="Trusted Sellers" key="2">
                            <Wholesaler />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </PageContainer>
    );
};

export default connect((state) => state)(HomeTechnologyPage);
