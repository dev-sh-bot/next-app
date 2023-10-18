import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductOnCart = ({ product, children }) => {
    const { thumbnailImage, title } = useProduct();
    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <p className='mb-0'>
                    <small>
                        Rs{product.discount ? product.variation[product.variationIndex].price - product.discount : product.variation[product.variationIndex].price} x {product.quantity}
                    </small>
                </p>{' '}
                <Link href={`/store/${product.shop.id}`} to={`/store/[slug]`}>
                    <small style={{cursor:"pointer"}}>
                        Shop: {product.shop.business_name}
                    </small>
                </Link>
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
