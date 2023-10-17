import Link from 'next/link';
import Slider from 'react-slick';
import CustomProduct from '~/components/elements/products/CustomProducts';
import CustomProductUser from '~/components/elements/products/CustomProductsUser';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { customStandard, customStandard2 } from '~/utilities/carousel-helpers';
import { generateTempArray } from '~/utilities/common-helpers';

const CustomShowProducts = ({
    collectionSlug,
    categorySlug,
    HomeData,
    links,
    title,
    userRole
}) => {
    console.log()
    // Views
    let productItemsView, linksView;
    if (userRole?.role?.name !== "retailer" && collectionSlug == "wholesaler") {
        if (HomeData && HomeData.length > 0) {
            const slideItems = HomeData.map((item) => (
                <CustomProductUser product={item} key={item.id} slug={collectionSlug} type={categorySlug} />
            ));
            productItemsView = (
                HomeData.length >= 3 ?
                    <Slider
                        {...customStandard}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider> :
                    <Slider
                        {...customStandard2}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider>
            );
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        if (HomeData && HomeData.length > 0) {
            const slideItems = HomeData.map((item) => (
                <CustomProduct product={item} key={item.id} slug={collectionSlug} type={categorySlug} />
            ));
            productItemsView = (
                HomeData.length >= 3 ?
                    <Slider
                        {...customStandard}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider> :
                    <Slider
                        {...customStandard2}
                        arrows={false}
                        className="ps-carousel outside">
                        {slideItems}
                    </Slider>
            );
        } else {
            productItemsView = <p>No product found.</p>;
        }
    }

    return (
        <Link href={`/shop/[slug]?type=${categorySlug}`} as={`/shop/${collectionSlug}?type=${categorySlug}`}>
        <div className='row'>
            <div className='col-md-12 mb-1'>
                <div className="card" style={{ border: "2px solid silver", borderRadius: "3.25rem", cursor: 'pointer' }}>
                    <div className="card-body text-center">
                        <div className="ps-product-list m-0">
                            <h3>{title}</h3>
                            <div className="ps-section__content p-0">
                                {productItemsView}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
};
export default CustomShowProducts;
