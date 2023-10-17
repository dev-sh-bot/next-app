import { useRouter } from 'next/router';
import React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
const ModuleProductDetailSharing = () => {
    const router = useRouter()
    console.log("pathname", router)
    return (
        <div className="ps-product__sharing">
            <FacebookShareButton
                url={`https://realbazar.pk${router.asPath}`}
                hashtag={'#realbazar'}
                description={'The Real Bazar'}
                className="Demo__some-network__share-button">
                <FacebookIcon size={42} round />
            </FacebookShareButton>
            {/* <br /> */}
            <TwitterShareButton
                title={'The Real Bazar'}
                url={`https://realbazar.pk${router.asPath}`}
                hashtags={['realbazar', 'shopping', 'products', 'ecommerce']}>
                <TwitterIcon size={42} round />
            </TwitterShareButton>
            <WhatsappShareButton title={'Real Bazar Ecommerce Platform '} url={`https://realbazar.pk${router.asPath}`}>
                <WhatsappIcon size={42} round />
            </WhatsappShareButton>
            {/*         
        <a className="facebook" href="#">
            <i className="fa fa-facebook"></i>
        </a>
        <a className="twitter" href="#">
            <i className="fa fa-twitter"></i>
        </a>
        <a className="google" href="#">
            <i className="fa fa-google-plus"></i>
        </a>
        <a className="linkedin" href="#">
            <i className="fa fa-linkedin"></i>
        </a>
        <a className="instagram" href="#">
            <i className="fa fa-instagram"></i>
        </a> */}
        </div>
    )
};

export default ModuleProductDetailSharing;
