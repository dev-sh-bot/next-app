import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Addresses from '~/components/partials/account/Addresses';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Addresses',
        },
    ];
    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Addresses />
            </div>
        </PageContainer>
    );
};

export default MyAccountPage;
