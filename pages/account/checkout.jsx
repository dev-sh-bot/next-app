import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';

import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
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
        },
    ];

    const Router = useRouter()

    useEffect(() => {
        let ls = localStorage.getItem("realBazarUsertoken");
        if (ls === null) {
            Router.push("/account/login");
        }
    }, [])

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"} />
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
