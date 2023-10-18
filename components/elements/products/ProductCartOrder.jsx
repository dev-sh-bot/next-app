import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductCartOrder = ({ product }) => {
    const { thumbnailImageOrder, title } = useProduct();
    // console.log("productOrderCart",product)
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.id}`}>
                    <a>{thumbnailImageOrder(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">{title(product)}</div>
        </div>
    );
};

export default ProductCartOrder;
