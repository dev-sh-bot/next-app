import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import PageContainer from '~/components/layouts/PageContainer';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderMobileTechnology from '~/components/shared/headers/HeaderMobileTechnology';
import HeaderTechnology from '~/components/shared/headers/HeaderTechnology';
import ApiCaller from '~/repositories/ApiCaller';

const ProductDefaultPage = ({ ecomerce }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (pid) {
            getProduct(pid);
        }
    }, [pid]);

    async function getProduct(id) {
        setLoading(true);
        const endPoint = `/show/product`;
        let formData = new FormData()
        formData.append("id", id)
        const responseData = await ApiCaller.Post(endPoint, formData)

        console.log(responseData)
        if (responseData.status) {
            setProduct(responseData?.data?.Products[0]);
            setTimeout(() => {
                setLoading(false);
            }, 250);
        }
    }

    // useEffect(() => {
    //     getProduct(pid);
    // }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} ecomerce={ecomerce} />;
            headerView = (
                <>
                    <HeaderTechnology />
                    <HeaderMobileTechnology />
                </>
            );
        } else {
            headerView = (
                <>
                    <HeaderTechnology />
                    <HeaderMobileTechnology />
                </>
            );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }

    return (
        <PageContainer
            header={headerView}
            title={product ? product.title : 'Loading...'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                {/* <div className="ps-container"> */}
                <div className="container-fluid">
                    <div className="ps-page__container">
                        {productView}
                    </div>

                    {product ?
                        <RelatedProduct slug={product.category.id} collectionSlug="shop-recommend-items" />
                        : null}
                </div>
            </div>
        </PageContainer>
    );
};

export default connect((state) => state)(ProductDefaultPage);
