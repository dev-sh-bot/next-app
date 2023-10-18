import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Notifications from '~/components/partials/account/Notifications';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const AccountNotificationsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Notifications',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Notifications />
                </div>
            </PageContainer>
        </>
    );
};

export default AccountNotificationsPage;
