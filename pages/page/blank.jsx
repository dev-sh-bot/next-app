import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import BlankContent from '~/components/partials/page/Blank';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const BlankPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Blank Page',
        },
    ];

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Blank page">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <BlankContent />
            </div>
        </PageContainer>
    );
};

export default BlankPage;
