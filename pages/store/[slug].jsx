import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import StoreDetail from '~/components/partials/stores/StoreDetail';

const StoreDetailPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Store',
            url: '/',
        },
        {
            text: 'Store Products',
        },
    ];

    return (
        <PageContainer title="Store" boxed={true}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth"/>
            <StoreDetail />
        </PageContainer>
    );
};

export default StoreDetailPage;
