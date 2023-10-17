
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const RecentViewedProductsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Recent Viewed Products',
        },
    ];
    return (
        <>
            <PageContainer
                footer={<FooterSecond classes="ps-footer--technology" />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <RecentViewedProducts />
                </div>
            </PageContainer>
        </>
    );
};

export default RecentViewedProductsPage;
