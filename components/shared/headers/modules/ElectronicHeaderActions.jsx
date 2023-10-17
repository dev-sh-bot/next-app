import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tooltip } from 'antd';

const ElectronicHeaderActions = ({ auth, ecomerce }) => {
    // console.log("ecomerce", ecomerce)
    const [Token, setToken] = useState(false)
    const [OrdersLength, setOrdersLength] = useState(0)
    useEffect(() => {
        let token = localStorage.getItem("realBazarUsertoken");
        setToken(token)
        let ordersLength = localStorage.getItem("orders");
        if (ordersLength !== null) {
            setOrdersLength(ordersLength)
        }
    }, [Token])
    return (
        <div className="header__actions">
            {Token !== null ? (<>
                <Link href="/chat">
                    <Tooltip title="Chat" placement={"bottom"}>
                        <a className="header__extra">
                            <i className="fa fa-commenting-o" aria-hidden="true"></i>
                        </a>
                    </Tooltip>
                </Link>
                {/* <Link href="/account/wishlist">
                    <Tooltip title="Wishlist" placement={"bottom"}>
                        <a className="header__extra">
                            <i className="icon-heart" aria-hidden="true"></i>
                            <span>
                                <i>{ecomerce.wishlistItems.length}</i>
                            </span>
                        </a>
                    </Tooltip>
                </Link> */}
                <Link href="/account/orders">
                    <Tooltip title="Orders" placement={"bottom"}>
                        <a className="header__extra">
                            <i className="icon-bag2"></i>
                            <span>
                                <i>{OrdersLength}</i>
                            </span>
                        </a>
                    </Tooltip>
                </Link>
            </>
            ) : null}
            <MiniCart />
            {/* {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? ( */}
            {Token !== null ? (
                <AccountQuickLinks isLoggedIn={true} setToken={setToken} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} setToken={setToken} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);
