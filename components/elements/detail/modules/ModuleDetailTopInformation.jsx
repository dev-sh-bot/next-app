import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import { Rate } from 'antd';

const ModuleDetailTopInformation = ({ product, VariationIndex }) => {
    // console.log("product, VariationIndex",product, VariationIndex)
    // Views
    let priceView;

    if (product.discount > 0) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">Rs{product.variation[VariationIndex].price}</del>
                Rs{product.variation[VariationIndex].price - product.discount}
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">Rs{product.variation[VariationIndex].price}</h4>;
    }
    return (
        <header>
            <h1>{product.title}</h1>
            <div className="ps-product__meta">
                {/* <p>
                    Brand:
                    <Link href="/store/[slug]" as={`/store/${product.shop.id}`}>
                        <a className="ml-2 text-capitalize">{product.shop.business_name}</a>
                    </Link>
                </p> */}
                {/* <div className="ps-product__rating"> */}
                {/* <Rating /> */}
                <Rate value={product.rating} disabled />
                <span>&nbsp; ( {product.totalReviews} review )</span>
                {/* </div> */}
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
