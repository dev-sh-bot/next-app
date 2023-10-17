import React from 'react';
import Head from 'next/head';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import HeaderTechnology from '../shared/headers/HeaderTechnology';
import HeaderMobileTechnology from '../shared/headers/HeaderMobileTechnology';
import FooterSecond from '../shared/footers/FooterSecond';

const initHeaders = (
    <>
        <HeaderTechnology />
        <HeaderMobileTechnology />
    </>
);
const initFooters = (
    <>
        {/* <FooterFullwidth /> */}
        <FooterSecond classes="ps-footer--technology" />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    let titleView;

    if (title !== '') {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;
