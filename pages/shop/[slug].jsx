import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import DownloadApp from '~/components/partials/commons/DownLoadApp';
import ShopItems2 from '~/components/partials/shop/ShopItems2';
import { useRouter } from 'next/router';

const ShopDefaultPage = () => {
    const router = useRouter();
    const {slug, type} = router.query;
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: type,
        },
    ];

    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                {/* <div className="ps-container"> */}
                <div className="container-fluid">
                    {/* <ShopBanner />
                    <ShopBrands /> */}
                    {/* <ShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories role={slug} type={type}/>
                            {/* <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange /> */}
                        </div>
                        <div className="ps-layout__right">
                            {/* <ProductGroupByCarousel
                                layout="fullwidth"
                                collectionSlug="shop-best-seller-items"
                                title="Best Sale Items"
                            />
                            <ProductGroupByCarousel
                                collectionSlug="shop-recommend-items"
                                title="Recommended Items"
                            /> */}
                            <ShopItems2 columns={6} pageSize={12} slug={slug} type={type}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DownloadApp /> */}
            {/* <Newletters /> */}
        </PageContainer>
    );
};
export default ShopDefaultPage;
