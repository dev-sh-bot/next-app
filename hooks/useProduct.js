import React from 'react';
import LazyLoad from 'react-lazyload';
import {
    baseUrl,
    baseUrlImageNew,
    baseUrlNew,
} from '~/repositories/Repository';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === 'large') {
            if (source.formats.large) {
                image = source.formats.large.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'medium') {
            if (source.formats.medium) {
                image = source.formats.medium.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'thumbnail') {
            if (source.formats.thumbnail) {
                image = source.formats.source.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'small') {
            if (source.formats.small !== undefined) {
                image = source.formats.small.url;
            } else {
                image = source.url;
            }
        } else {
            image = source.image;
        }
        imageURL = `${baseUrlImageNew}${image}`;
    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImage: (payload) => {
            if (payload) {
                if (payload.image) {
                    return (
                        <>
                            <LazyLoad>
                                <img
                                    src={getImageURL(payload.image[0])}
                                    alt={getImageURL(payload.image[0])}
                                    style={{ maxHeight: '200px' }}
                                // height={"200px"}
                                />
                            </LazyLoad>
                        </>
                    );
                }
            }
        },
        thumbnailImageOrder: (payload) => {
            if (payload) {
                if (payload.images) {
                    return (
                        <>
                            <LazyLoad>
                                <img
                                    src={getImageURL(payload.images[0])}
                                    alt={getImageURL(payload.images[0])}
                                    style={{ maxHeight: '200px' }}
                                // height={"200px"}
                                />
                            </LazyLoad>
                        </>
                    );
                }
            }
        },
        thumbnailDemadProduct: (payload) => {
            if (payload) {
                if (payload.demand_image) {
                    return (
                        <>
                            <LazyLoad>
                                <img
                                    src={baseUrlImageNew + payload.demand_image[0].images}
                                    alt={baseUrlImageNew + payload.demand_image[0].images}
                                    style={{ maxHeight: '140px', objectFit:"contain" }}
                                // height={"200px"}
                                />
                            </LazyLoad>
                        </>
                    );
                }
            }
        },
        price: (payload) => {
            let view;
            if (payload.discount) {
                view = (
                    <p className="ps-product__price sale">
                        <span>Rs</span>
                        {formatCurrency(
                            payload.variation[0].price - payload.discount
                        )}
                        {payload.discount > 0 ? (
                            <del className="ml-2">
                                <span>Rs</span>
                                {formatCurrency(payload.variation[0].price)}
                            </del>
                        ) : null}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        <span>Rs</span>
                        {formatCurrency(payload.variation[0].price)}
                    </p>
                );
            }
            return view;
        },
        badges: (payload) => {
            let view = null;
            if (payload.badges && payload.badges.length > 0) {
                const items = payload.badges.map((item) => {
                    if (item.value === 'hot') {
                        return (
                            <span
                                className="ps-product__badge hot"
                                key={item.id}>
                                Hot
                            </span>
                        );
                    }
                    if (item.value === 'new') {
                        return (
                            <span
                                className="ps-product__badge new"
                                key={item.id}>
                                New
                            </span>
                        );
                    }
                    if (item.value === 'sale') {
                        return (
                            <span
                                className="ps-product__badge sale"
                                key={item.id}>
                                Sale
                            </span>
                        );
                    }
                });
                view = <div className="ps-product__badges">{items}</div>;
            }
            return view;
        },
        badge: (payload) => {
            let view;
            if (payload.badge && payload.badge !== null) {
                view = payload.badge.map((badge) => {
                    if (badge.type === 'sale') {
                        return (
                            <div className="ps-product__badge">
                                {badge.value}
                            </div>
                        );
                    } else if (badge.type === 'outStock') {
                        return (
                            <div className="ps-product__badge out-stock">
                                {badge.value}
                            </div>
                        );
                    } else {
                        return (
                            <div className="ps-product__badge hot">
                                {badge.value}
                            </div>
                        );
                    }
                });
            }
            if (payload.discount) {
                const discountPercent = (
                    (payload.discount / payload.variation[0].price) *
                    100
                ).toFixed(0);
                return (
                    <>
                        {discountPercent !== "0" ? (
                            <div className="ps-product__badge">
                                -{discountPercent}%
                            </div>
                        ) : null}
                    </>
                );
            }
            return view;
        },
        brand: (payload) => {
            let view;
            if (payload.brands && payload.brands.length > 0) {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">
                            {payload.brands[0].name}
                        </a>
                    </Link>
                );
            } else {
                view = (
                    <Link href="/shop">
                        <a className="text-capitalize">No Brand</a>
                    </Link>
                );
            }
            return view;
        },
        title: (payload) => {
            let view = (
                <Link href="/product/[pid]" as={`/product/${payload.id}`}>
                    <a className="ps-product__title">{payload.title}</a>
                </Link>
            );
            return view;
        },
        titleUser: (payload) => {
            let view = (
                // <Link href="/product/[pid]" as={`/product/${payload.id}`}>
                <a className="ps-product__title">{payload.title}</a>
                // </Link>
            );
            return view;
        },
        shopName: (payload) => {
            let view = (
                <Link href="/store/[slug]" as={`/store/${payload.shop.id}`}>
                    <a className="ps-product__title">
                        Shop: {payload.shop.business_name}
                    </a>
                </Link>
            );
            return view;
        },
        shopNameUser: (payload) => {
            let view = (
                // <Link href="/store/[pid]" as={`/store/${payload.shop.id}`}>
                <a className="">Shop: {payload.shop.username}</a>
                // </Link>
            );
            return view;
        },
    };
}
