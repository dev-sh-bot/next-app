import React from 'react'
import Slider from 'react-slick'
import { baseUrlImageNew } from '~/repositories/Repository'
import { carouselSingle } from '~/utilities/carousel-helpers'

export default function AdsSlider({ Data }) {
    return (
        <div className="container-fluid pb-5">
            <div className="row">
                {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 "> */}
                <div className="col-sm-12">
                    <Slider {...carouselSingle} className="ps-carousel outside">
                        {Data.map((e, i) => (
                            <a href={e.url} target="_blank" key={i}>
                                <img className='obj-cover w-100' src={baseUrlImageNew + e.image} alt="banner" height={250} />
                            </a>
                        ))}
                        {/* // <img src="/static/img/slider/home-6/1.jpg" alt="" />
                        // <img src="/static/img/slider/home-3/home-banner/2.jpg" alt="" /> */}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
