import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import ModuleProductWideActions from '~/components/elements/products/modules/ModuleProductWideActions';
import useProduct from '~/hooks/useProduct';
import notificationAlert from '~/components/utils/notificationAlert';

const ProductWide = ({ product, collectionSlug, userRole }) => {
    const { thumbnailImage, price, title,titleUser, badge } = useProduct();
    return (
        userRole?.role?.name !== "retailer" && collectionSlug == "wholesaler" ?
            <div className="ps-product ps-product--wide" onClick={() => notificationAlert("info", "Opps!", "You need to signin with retailer account")}>
                <div className="ps-product__thumbnail">
                    {/* <Link href={`/product/${product.id}`}> */}
                    <a>{thumbnailImage(product)}</a>
                    {/* </Link> */}
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        {titleUser(product)}
                        <p className="ps-product__vendor">
                            Sold by:
                            <Link href="/shop">
                                <a> {product.shop.username}</a>
                            </Link>
                        </p>
                        <ul className="ps-product__desc">
                            <li>{product.product_description}</li>
                        </ul>
                    </div>
                    {/* <ModuleProductWideActions product={product} /> */}
                </div>
            </div>

            :

            <div className="ps-product ps-product--wide">
                <div className="ps-product__thumbnail">
                    <Link href={`/product/${product.id}`}>
                        <a>{thumbnailImage(product)}</a>
                    </Link>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        {title(product)}
                        <p className="ps-product__vendor">
                            Sold by:
                            <Link href="/shop">
                                <a> {product.shop.username}</a>
                            </Link>
                        </p>
                        <ul className="ps-product__desc">
                            <li>{product.product_description}</li>
                        </ul>
                    </div>
                    <ModuleProductWideActions product={product} />
                </div>
            </div>
    );
};

export default ProductWide;
