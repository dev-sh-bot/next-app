import React from 'react';
import Head from 'next/head';

const MainHead = () => (
    <Head>
        <title>Real_Bazar</title>
        <link rel="shortcut icon" href="/static/img/favicon-realbazar.png" />
        {/* <link rel="icon" href="/static/img/favi.png" sizes="32x32" />
        <link rel="icon" href="/static/img/favi.png" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="/static/img/favi.png" /> */}

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="author" content="icotsolutions" />
        <meta name="keywords" content="Real_Bazar, React, Next, eCommerce, wholesale" />
        <meta
            name="description"
            content="Real_Bazar"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMbdKW4sBsRCSIoUWkadnkWq49cuu50XI&libraries=places" />
    </Head>
);

export default MainHead;
