import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
            Sold By:
            <Link href="/store/[slug]" as={`/store/${product.shop.id}`}>
                <a>
                    <strong> {product.shop.business_name}</strong>
                </a>
            </Link>
        </p>
        <ul className="ps-list--dot">
            <li>{product.product_description}</li>
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
