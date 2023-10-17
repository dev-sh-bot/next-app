import React, { Component, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, setUserObj } from '../../../store/auth/action';

import { Form, Input, notification } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Loader } from 'react-overlay-loader';
import axios from 'axios'
import { baseUrlNew } from '~/repositories/Repository';
import notificationAlert from '~/components/utils/notificationAlert';
const Login = (props) => {
    // const [UserEmail, setUserEmail] = useState("")
    // const [Password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();

    // static getDerivedStateFromProps(props) {
    //     if (props.isLoggedIn === true) {
    //         Router.push('/');
    //     }
    //     return false;
    // }

    const handleFeatureWillUpdate = (e) => {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    // handleLoginSubmit = e => {
    //     console.log('test');
    //     this.props.dispatch(login());
    //     Router.push('/');

    // };

    const handleInutChange = (e, func) => {
        func(e.target.value)
    }

    const onFinish = (values) => {
        console.log("values",values)
        Login(values.username,values.password)
    };


    const Login = (username,password) => {
        setLoader(true);
        const form = new FormData();
        form.append("emailphone", username);
        form.append("password", password);
        form.append("role", "user");

        axios({
            method: 'post',
            url: `${baseUrlNew}/login`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege...'
            },
            data: form
        }).then(result => {
            setLoader(false);
            console.log("login", result);
            const Data = result.data
            if (Data.status) {
                notificationAlert("success", "Wellcome Back", Data.Message);
                props.dispatch(login());
                console.log("userData", Data)
                dispatch(setUserObj(Data.user));
                localStorage.setItem("realBazarUsertoken", Data.token)
                localStorage.setItem("realBazarUserObj", JSON.stringify(Data.user))
                Router.push('/');
            } else {
                if (Data.errors !== undefined) {
                    const ErrList = Object.keys(Data.errors);
                    ErrList.map((e) => {
                        notificationAlert("warning", "Opps", Data.errors[e][0]);
                    });
                } else {
                    notificationAlert("warning", "Opps", Data.Message);
                }
            }
        }, (error) => {
            setLoader(false);
            if (error.response !== undefined) {
                const Data = error.response.data;
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps", Data.errors[e][0]);
                });
            }
            else {
                notificationAlert("error", "Opps", error.message);
            }
        });
    }

    return (
        <div className="ps-my-account">
            {loader ? <Loader fullPage loading /> : null}
            <div className="container-fluid">
                <Form onFinish={onFinish}
                    className="ps-form--account">
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email address"
                                        // onChange={(e) => handleInutChange(e, setUserEmail)}
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
                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                    />
                                    <label htmlFor="remember-me">
                                        Rememeber me
                                    </label>
                                </div>
                            </div>
                            <div className="form-group submit pb-5">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                // onClick={Login}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        {/* <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="#"
                                        onClick={e =>
                                            handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="#"
                                        onClick={e =>
                                            handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="twitter"
                                        href="#"
                                        onClick={e =>
                                            handleFeatureWillUpdate(e)
                                        }>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="#"
                                        onClick={e =>
                                            handleFeatureWillUpdate(e)
                                        }>
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
export default connect(mapStateToProps)(Login);
