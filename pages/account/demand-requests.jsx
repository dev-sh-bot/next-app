import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DemandRequest from '~/components/partials/account/DemandRequest';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const DemandRequestPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Demand Request',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Demand Requests">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} layout="fullwidth"/>
                    <DemandRequest />
                </div>
            </PageContainer>
        </>
    );
};

export default DemandRequestPage;
