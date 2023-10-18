import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import notificationAlert from '~/components/utils/notificationAlert';

const Product = ({ product, collectionSlug, userRole }) => {
    const { thumbnailImage, price, badge, title, titleUser, shopName, shopNameUser } = useProduct();
    return (
        userRole?.role?.name !== "retailer" && collectionSlug == "wholesaler" ?
            <div className="ps-product" onClick={() => notificationAlert("info", "Opps!", "You need to signin with retailer account")}>
                <div className="ps-product__thumbnail">
                    {/* <Link href="/product/[pid]" as={`/product/${product.id}`}> */}
                    <a>{thumbnailImage(product)}</a>
                    {/* </Link> */}
                    {badge(product)}
                    {/* <ModuleProductActions product={product} /> */}
                </div>
                <div className="ps-product__container">
                    <Link href="/shop">
                        <a className="ps-product__vendor">{product.username}</a>
                    </Link>
                    <div className="ps-product__content">
                        {titleUser(product)}
                        {shopNameUser(product)}
                        <div className="ps-product__rating">
                            <Rating />
                            <span>{product.totalReviews}</span>
                        </div>
                        {/* {price(product)} */}
                    </div>
                    <div className="ps-product__content hover">
                        {titleUser(product)}
                        {shopNameUser(product)}
                        {/* {price(product)} */}
                    </div>
                </div>
            </div>

            :

            <div className="ps-product">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a>{thumbnailImage(product)}</a>
                    </Link>
                    {badge(product)}
                    <ModuleProductActions product={product} />
                </div>
                <div className="ps-product__container">
                    <Link href="/shop">
                        <a className="ps-product__vendor">{product.username}</a>
                    </Link>
                    <div className="ps-product__content">
                        {title(product)}
                        <div className="ps-product__rating">
                            <Rating />
                            {/* <Rating rate={product.rating} noRate={5 - product.rating} /> */}
                            <span>{product.totalReviews}</span>
                        </div>
                        {shopName(product)}
                        {price(product)}
                    </div>
                    <div className="ps-product__content hover">
                        {title(product)}
                        {shopName(product)}
                        {price(product)}
                    </div>
                </div>
            </div>
    );
};

export default Product;
