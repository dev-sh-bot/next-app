import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import ProductItems from '~/components/partials/product/ProductItems';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';

const ProductCategoryScreen = () => {
    const Router = useRouter();
    const { slug, role, type } = Router.query;
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getCategry() {
        setLoading(true);
        if (slug) {
            const responseData = await ProductRepository.getProductsByCategory(slug, "category", role, type);
            if (responseData) {
                setCategory(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        } else {
            await Router.push('/shop');
        }
    }

    useEffect(() => {
        getCategry();
    }, [slug]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: type ? type : "shop",
            url: type ? `/shop/${role}?type=${type}` : `/shop/${role == "wholesaler" ? "whole" : "retail"}`,
        },
        {
            text: category ? slug : 'Product category',
        },
    ];

    //Views
    let productItemsViews;

    if (!loading) {
        if (category && category.Product.length > 0) {
            productItemsViews = (
                <ProductItems columns={6} products={category.Product} collectionSlug={role} />
            );
        } else {
            productItemsViews = <p>No Product found</p>;
        }
    } else {
        productItemsViews = <p>Loading...</p>;
    }

    return (
        <PageContainer
            footer={<FooterSecond classes="ps-footer--technology" />}
            title={category ? 'Category' : 'Category'}
            boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container-fluid">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories role={role} type={type ? type : ""} />
                            {/* <WidgetShopBrands /> */}
                            {/* <WidgetShopFilterByPriceRange /> */}
                        </div>
                        <div className="ps-layout__right">
                            <h3 className="ps-shop__heading">
                                {category && category.name}
                            </h3>
                            {productItemsViews}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
