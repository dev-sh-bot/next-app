import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import { baseUrlNew } from '~/repositories/Repository';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { Loader } from 'react-overlay-loader';
import notificationAlert from '~/components/utils/notificationAlert';



const Register = (props) => {
    // const [Email, setEmail] = useState("")
    // const [Password, setPassword] = useState("")
    // const [Name, setName] = useState("")
    const [loader, setLoader] = useState(false)

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // props.form.validateFields((err, values) => {
    //     //     if (!err) {
    //     //         this.props.dispatch(login());
    //     //         Router.push('/account/login');
    //     //     } else {
    //     //     }
    //     // });
    // };

    const handleInutChange = (e, func) => {
        func(e.target.value)
    }

    const onFinish = (values) => {
        register(values.username,values.email,values.password)
    };

    const register = (name,email,password) => {
        setLoader(true);
        const form = new FormData();
        form.append("role", "user");
        form.append("name", name);
        form.append("emailphone", email);
        form.append("password", password);

        axios({
            method: 'post',
            url: `${baseUrlNew}/signup`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege...'
            },
            data: form
        }).then(result => {
            setLoader(false);
            console.log("register", result);
            const Data = result.data
            if (Data.status) {
                notificationAlert("success", "Congratulations!", Data.Message);
                Router.push('/account/login');
            } else {
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps!", Data.errors[e][0]);
                });
            }
        }, (error) => {
            setLoader(false);
            console.log("error.response", error.response)
            if (error.response !== undefined) {
                const Data = error.response.data;
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps!", Data.errors[e][0]);
                });
            }
            else {
                notificationAlert("error", "Opps!", error.message);
            }
        });
    }

    return (
        <div className="ps-my-account">
            {loader ? <Loader fullPage loading /> : null}
            <div className="container-fluid">
                <Form
                    className="ps-form--account"
                    onFinish={onFinish}
                >
                    <ul className="ps-tab-list">
                        <li>
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                        <li className="active">
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your User name!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="User Name"
                                    // onChange={(e) => handleInutChange(e, setName)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your email or phone!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email address or phone number"
                                    // onChange={(e) => handleInutChange(e, setEmail)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input.Password
                                        className="form-control"
                                        placeholder="Password..."
                                    // onChange={(e) => handleInutChange(e, setPassword)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">

                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        className="form-control"
                                        placeholder="Confirm Password..."
                                    // onChange={(e) => handleInutChange(e, setPassword)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit pb-5">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    // onClick={register}
                                    >
                                    Register
                                </button>
                            </div>
                        </div>
                        {/* <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a className="facebook" href="#">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="google" href="#">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" href="#">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="instagram" href="#">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state.auth;
};

export default connect(mapStateToProps)(Register);
