
import { connect } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';

import PageContainer from '~/components/layouts/PageContainer';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const PaymentPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
            url: '/account/checkout',
        },
        {
            text: 'Payment',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"}/>
                    <Payment />
                </div>
                <hr />
            </PageContainer>
        </>
    );
};

export default connect()(PaymentPage);
