import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FaqsContent from '~/components/partials/page/FaqsContent';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const FaqsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Frequently Asked Questions',
        },
    ];

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="FAQ page">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth"/>
                <div className="container-fluid">
                    <FaqsContent />
                </div>
            </div>
        </PageContainer>
    );
};

export default FaqsPage;
