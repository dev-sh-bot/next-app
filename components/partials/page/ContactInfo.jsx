import React from 'react';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container-fluid">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <a href="mailto:therealbazar04@gmail.com">
                                    therealbazar04@gmail.com
                                </a>
                                <span>0345 3999 699</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Head Office</h4>
                            <p>
                                <span>
                                    Office A6, 3rd Floor, Court View Apartment, Court Road
                                </span>
                                <a href="#">Karachi, Pakistan</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Send your CV to our email:</span>
                                <a href="mailto:therealbazar04@gmail.com">therealbazar04@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
