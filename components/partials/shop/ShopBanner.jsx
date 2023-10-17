import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';


const ShopBanner = () => {
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        pauseOnHover: true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                <img src="/static/img/slider/shop-default/1.jpg" alt="Real_Bazar" />
                <img src="/static/img/slider/shop-default/2.jpg" alt="Real_Bazar" />
            </Slider>
        </div>
    );
}

export default ShopBanner;
