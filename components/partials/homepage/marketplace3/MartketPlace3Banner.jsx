import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import MenuCategories from '../../../shared/headers/modules/MenuCategories';
import { useRouter } from 'next/router';
import { baseUrlImageNew } from '~/repositories/Repository';

const MartketPlace3Banner = ({ slug, role, images, slider }) => {
    // console.log("images", images)
    // console.log("slider", slider)
    const carouselSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const Router = useRouter()
    const navi = () => {
        Router.push({
            pathname: `/shop/${slug}`
        })
    }
    return (
        <section className="ps-home-banner">
            <div className="container-fluid">
                <div className="ps-section__left">
                    <MenuCategories slug={role} />
                </div>
                <div className="ps-section__center">
                    <div className="item" onClick={navi}>
                        <a>
                            <img src={baseUrlImageNew + slider[0]?.image} alt="Real_Bazar" />
                        </a>
                    </div>
                    {/* <Slider {...carouselSettings} >
                        {slider.map((e) => (
                            <div key={e.id} className="item" onClick={navi}>
                                <a>
                                    <img src={baseUrlImageNew + e.image} alt="Real_Bazar" />
                                </a>
                            </div>
                        ))}
                    </Slider> */}
                    {/* <Link href="/shop">
                            <a>
                                <img src="/static/img/slider/home-5/promotion-6.jpg" alt="Real_Bazar" />
                            </a>
                        </Link> */}
                </div>
                <div className="ps-section__right" onClick={navi}>
                    {images.map((e) => (
                        <a key={e.id}>
                            <img src={baseUrlImageNew + e.image} alt="Real_Bazar" />
                        </a>
                    ))}
                    {/* <Link href="">
                         <a>
                             <img src="/static/img/slider/home-5/promotion-1.jpg" alt="Real_Bazar" />
                         </a>
                     </Link>
                     <Link href="">
                         <a>
                             <img src="/static/img/slider/home-5/promotion-2.jpg" alt="Real_Bazar" />
                         </a>
                     </Link>
                     <Link href="">
                         <a className="wide">
                             <img src="/static/img/slider/home-5/promotion-3.jpg" alt="Real_Bazar" />
                         </a>
                     </Link>
                     <Link href="">
                         <a>
                             <img src="/static/img/slider/home-5/promotion-4.jpg" alt="Real_Bazar" />
                         </a>
                     </Link>
                     <Link href="">
                         <a>
                             <img src="/static/img/slider/home-5/promotion-5.jpg" alt="Real_Bazar" />
                         </a>
                     </Link> */}
                </div>
            </div>
        </section>
    );
}

export default MartketPlace3Banner;
