import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModuleOrders from '~/components/ecomerce/modules/ModuleOrders';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import notificationAlert from '~/components/utils/notificationAlert';
import ApiCaller from '~/repositories/ApiCaller';

const Orders = () => {
    const [AllOrders, setAllOrders] = useState([])
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("realBazarUsertoken") == null) {
            notificationAlert("info", "Opps!", "please login your account");
            router.push('/account/login');
        } else {
            getOrders();
        }
    }, []);

    const getOrders = () => {
        const endPoint = `/users/order`;
        let token = localStorage.getItem("realBazarUsertoken");
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        ApiCaller.Get(endPoint, BearerHeaders).then((response) => {
            if (response.data) {
                // console.log("orders", response.data.Orders);
                setAllOrders(response.data.Orders)
                localStorage.setItem("orders", response.data.Orders.length)
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    const refund = (id) => {
        const endPoint = `/refund/order`;
        let token = localStorage.getItem("realBazarUsertoken");
        let formData = new FormData()
        formData.append("order_id", id)
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        ApiCaller.Post(endPoint,formData, BearerHeaders).then((response) => {
            if (response.data) {
                // console.log(response.data)
                notificationAlert("success", "Success!", response.data.Message);
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Orders',
        },
    ];

    // View
    let contentView;
    if (AllOrders) {
        if (AllOrders.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleOrders AllOrders={AllOrders} refund={refund}/>
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a className="ps-btn">Back to Shop</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        } else {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <div className="alert alert-info">
                            <p className="mb-0">
                                Your Orders is currently empty.
                            </p>
                        </div>

                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a className="ps-btn">Back to Shop</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    } else {
    }

    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Orders">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"} />
                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container-fluid">
                            <div className="ps-section__header">
                                <h1>Orders</h1>
                            </div>
                            {contentView}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default connect((state) => state)(Orders);
