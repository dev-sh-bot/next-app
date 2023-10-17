import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';
import FooterLinks from './modules/FooterLinks';

const FooterSecond = ({ classes }) => (
    <footer className={`ps-footer ps-footer--2 ${classes}`}>
        <div className="container-fluid">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-md-10">
                        <FooterLinks />
                        {/* <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        Quick links
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Term & Condition</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Shipping</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Return</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/faqs">
                                                <a>FAQs</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Company</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/about-us">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <a>Career</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/contact-us">
                                                <a>Contact</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Bussiness</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/">
                                                <a>Home</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog">
                                                <a>Our Press</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">
                                                <a>Shop</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div> */}
                    </div>

                    <div className="col-md-2">
                        <aside className="widget widget_footer widget_contact-us">
                            <h4 className="widget-title">
                                <Link href={'/page/contact-us'}>
                                    Contact us
                                </Link>
                            </h4>
                            <div className="widget_content">
                                <p>Call us 24/7</p>
                                <h3>0345 3999 699</h3>
                                <p>
                                    {/* 502 New Design Str, Melbourne, Australia <br /> */}
                                    <a href="mailto:therealbazar04@gmail.com">
                                        therealbazar04@gmail.com
                                    </a>
                                </p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a
                                            className="facebook"
                                            href="https://www.facebook.com/profile.php?id=100081929293425"
                                            target="_blank">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="instagram"
                                            href="https://www.instagram.com/realbazar.pk/"
                                            target="_blank">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="whatsapp"
                                            href="whatsapp://send?text=Welcome to Real Bazar https://realbazar.pk&phone=+923453999699"
                                            target="_blank">
                                            <i className="fa fa-whatsapp"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href=" https://www.linkedin.com/in/real-bazar-pk-971b88247/"
                                            target="_blank">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="twitter"
                                            href="https://twitter.com/RealBazarpvtltd?t=WEyByiDoDBZDCCDHba4V6w&s=09"
                                            target="_blank">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a className="google-plus" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="ps-footer__copyright">
                {/* <p>&copy;2022 Real Bazar. Designed By <a className='text-primary'>ICOTSOLUTIONS</a></p> */}
                <p>&copy;2023 Real Bazar. All Rights Reserved</p>
                <p>
                    <span>We Using Safe Payment For:</span>
                    <Link href="">
                        <a>
                            <Tooltip title="Cash on Delivery">
                                <img
                                    src="/static/img/payment-method/COD.png"
                                    alt="COD"
                                    width={40}
                                />
                            </Tooltip>
                        </a>
                    </Link>
                    <Link href="">
                        <a>
                            <Tooltip title="Easypaisa">
                                <img
                                    src="/static/img/payment-method/easypaisa.png"
                                    alt="Easypaisa"
                                    width={40}
                                />
                            </Tooltip>
                        </a>
                    </Link>
                    <Link href="">
                        <a>
                            <Tooltip title="Jazz Cash">
                                <img
                                    src="/static/img/payment-method/jazzCash.png"
                                    alt="Jazz Cash"
                                    width={40}
                                />
                            </Tooltip>
                        </a>
                    </Link>
                    <Link href="">
                        <a>
                            <Tooltip title="Master Debit Card">
                                <img
                                    src="/static/img/payment-method/3.jpg"
                                    alt="Master Debit Card"
                                    width={40}
                                />
                            </Tooltip>
                        </a>
                    </Link>
                    <Link href="">
                        <a>
                            <Tooltip title="Visa Debit Card">
                                <img
                                    src="/static/img/payment-method/5.jpg"
                                    alt="Visa Debit Card"
                                    width={40}
                                />
                            </Tooltip>
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    </footer>
);

export default FooterSecond;
