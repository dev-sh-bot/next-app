import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';

const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();

    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
        },
        {
            text: 'My Demand Requests',
            url: '/account/demand-requests',
        },
    ];

    const { isLoggedIn, setToken } = props;


    const handleLogout = (e) => {
        e.preventDefault();
        // localStorage.removeItem("realBazarUsertoken");
        // localStorage.removeItem("realBazarUserObj");
        // localStorage.removeItem("orders");
        setToken(false);
        localStorage.clear()
        dispatch(logOut());
    };

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <Link href={item.url}>
                <a>{item.text}</a>
            </Link>
        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="#" onClick={(e) => handleLogout(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <Link href="/account/login">
                        <a>Sign in</a>
                    </Link>
                    <Link href="/account/register">
                        <a>Join for free</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
