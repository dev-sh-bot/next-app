import React, { Component } from 'react';
import { Tabs } from 'antd';
import Link from 'next/link';

const { TabPane } = Tabs;
const TechnologyCategories = () => {
    const trendingCategories = [
        {
            imagePath: '/static/img/categories/home-5/1.jpg',
            text: '#television',
        },
        { imagePath: '/static/img/categories/home-5/2.jpg', text: '#camera' },
        { imagePath: '/static/img/categories/home-5/3.jpg', text: '#watch' },
        { imagePath: '/static/img/categories/home-5/4.jpg', text: '#chair' },
        { imagePath: '/static/img/categories/home-5/5.jpg', text: '#sneaker' },
        { imagePath: '/static/img/categories/home-5/6.jpg', text: '#xbox' },
        { imagePath: '/static/img/categories/home-5/7.jpg', text: '#gopro' },
        { imagePath: '/static/img/categories/home-5/8.jpg', text: '#lipstick' },
        { imagePath: '/static/img/categories/home-5/9.jpg', text: '#phone' },
        { imagePath: '/static/img/categories/home-5/10.jpg', text: '#laptop' },
        { imagePath: '/static/img/categories/home-5/11.jpg', text: '#speaker' },
        { imagePath: '/static/img/categories/home-5/12.jpg', text: '#book' },
        { imagePath: '/static/img/categories/home-5/13.jpg', text: '#blender' },
        { imagePath: '/static/img/categories/home-5/14.jpg', text: '#bag' },
        {
            imagePath: '/static/img/categories/home-5/15.jpg',
            text: '#smartphone',
        },
        { imagePath: '/static/img/categories/home-5/16.jpg', text: '#camping' },
    ];
    return (
        <div className="ps-deal-of-day">
            <div className="container-fluid">
                <div className="ps-section__header">
                    <h3>
                        CATEGORIES
                        {/* <span>Updated at 9:00AM</span> */}
                    </h3>
                </div>
                <div className="ps-section__content">
                    <div className="ps-block--categories-tabs ps-tab-root">
                        <div className="ps-block__header">
                            <div className="ps-block__item">
                                {trendingCategories.map((category) => (
                                    <Link
                                        href="/shop"
                                        key={category.text}>
                                        <a>
                                            <img
                                                src={category.imagePath}
                                                alt={category.text}
                                            />
                                            <span>{category.text}</span>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnologyCategories;
