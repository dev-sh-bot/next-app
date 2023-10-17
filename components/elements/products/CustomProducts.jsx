import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { baseUrlImageNew } from '~/repositories/Repository';

const CustomProduct = ({ product, slug, type }) => {
    return (
        <div className="ps-product__thumbnail">
            <Link href={`/shop/[slug]?type=${type}`} as={`/shop/${slug}?type=${type}`}>
                <a >
                    <LazyLoad>
                        <img
                            src={baseUrlImageNew + product.image}
                            alt={baseUrlImageNew + product.image}
                            style={{ maxHeight: "100px" }}
                        />
                    </LazyLoad>
                </a>
            </Link>
        </div>
    );
};

export default CustomProduct;
