
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import UserInformation from '~/components/partials/account/UserInformation';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const UserInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UserInformation />
            </div>
        </PageContainer>
    );
};

export default UserInformationPage;
