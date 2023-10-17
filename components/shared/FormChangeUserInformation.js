import React from 'react';

const FormChangeUserInformation = ({ EmailPhone, Username, setEmailPhone, setUsername, UpdateProfile }) => {
    return (
        <form className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="row">
                    {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                    </div> */}

                    {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div> */}
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setEmailPhone(e.target.value)}
                                value={EmailPhone}
                                placeholder="Email Address or phone"
                            />
                        </div>
                    </div>
                    {/* <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                    </div> */}
                    {/* <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                    </div> */}
                </div>

                <div className="form-group submit">
                    <button className="ps-btn" onClick={UpdateProfile}>Update profile</button>
                </div>
            </div>
        </form>
    );
};

export default FormChangeUserInformation;
