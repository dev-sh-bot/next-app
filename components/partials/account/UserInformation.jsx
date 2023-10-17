import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import notificationAlert from '~/components/utils/notificationAlert';
import ApiCaller from '~/repositories/ApiCaller';
import { logOut } from '~/store/auth/action';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

const UserInformation = () => {
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
    ];

    const [EmailPhone, setEmailPhone] = useState("")
    const [Username, setUsername] = useState("")
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        GetProfile()
    }, [])

    const GetProfile = () => {
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/profile`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        ApiCaller.Get(endPoint, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data.status) {
                // notificationAlert("success", "Success!", Data.Message)
                console.log("response", Data)
                if (Data.user.email !== null) {
                    setEmailPhone(Data.user.email)
                } else {
                    setEmailPhone(Data.user.phone)
                }
                setUsername(Data.user.username)
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
        }).catch((error) => {
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

    const UpdateProfile = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/profile/update`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("username", Username)
        formData.append("emailphone", EmailPhone)
        ApiCaller.Post(endPoint, formData, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data.status) {
                console.log("response", Data)
                localStorage.setItem("realBazarUserObj", JSON.stringify(Data.user))
                notificationAlert("success", "Success!", Data.Message)
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
        }).catch((error) => {
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

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear()
        dispatch(logOut());
        router.push("/account/login")
    };


    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} Username={Username} handleLogout={handleLogout} />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation EmailPhone={EmailPhone} setEmailPhone={setEmailPhone} Username={Username} setUsername={setUsername} UpdateProfile={UpdateProfile} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
