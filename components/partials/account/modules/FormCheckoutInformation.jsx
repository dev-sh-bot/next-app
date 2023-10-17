import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';

function FormCheckoutInformation() {
    const [EmailPhone, setEmailPhone] = useState("");
    const [UserName, setUserName] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");

    const handleInutChange = (e, func) => {
        func(e.target.value);
    }

    // useEffect(() => {
    //     let UserObj = JSON.parse(localStorage.getItem("realBazarUserObj"));
    //     console.log("UserObj", UserObj)
    //     setEmailPhone(UserObj.email)
    //     setUserName(UserObj.username)
    //     setAddress(UserObj.address ? UserObj.address : "")
    //     setPhone(UserObj.phone ? UserObj.phone : "")
    // }, [])

    const handleLoginSubmit = () => {
        Router.push({
            pathname: '/account/payment',
            query: { username: UserName, address: Address, phone: Phone, EmailPhone: EmailPhone }
        });
        localStorage.setItem("realBazarUserAddress", JSON.stringify({ username: UserName, address: Address, phone: Phone, EmailPhone: EmailPhone }))
    };

    return (
        <Form
            className="ps-form__billing-info"
            onFinish={handleLoginSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message:
                                'Enter an email or mobile phone number!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        value={EmailPhone}
                        placeholder="Email or phone number"
                        onChange={(e) => handleInutChange(e, setEmailPhone)}
                    />
                </Form.Item>
            </div>
            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your user name!',
                                },
                            ]}>
                            <Input
                                className="form-control"
                                type="text"
                                value={UserName}
                                placeholder="User Name"
                                onChange={(e) => handleInutChange(e, setUserName)}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Form.Item
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an address!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        value={Address}
                        placeholder="Address"
                        onChange={(e) => handleInutChange(e, setAddress)}
                    />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Enter an Phone!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        value={Phone}
                        placeholder="Phone"
                        onChange={(e) => handleInutChange(e, setPhone)}
                    />
                </Form.Item>
            </div>

            {/* <div className="form-group">
                    <div className="ps-checkbox">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="save-information"
                        />
                        <label htmlFor="save-information">
                            Save this information for next time
                        </label>
                    </div>
                </div> */}

            <div className="ps-form__submit">
                <Link href="/account/cart">
                    <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to shopping cart
                    </a>
                </Link>
                <div className="ps-block__footer">
                    <button className="ps-btn">Continue to payment</button>
                </div>
            </div>
        </Form>
    );
}

export default FormCheckoutInformation;
