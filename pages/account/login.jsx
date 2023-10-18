
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Login from '~/components/partials/account/Login';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const LoginPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Login',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Login">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"}/>
                    <Login />
                </div>
            </PageContainer>
        </>
    );
};

export default LoginPage;
