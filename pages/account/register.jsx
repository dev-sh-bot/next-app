
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Register from '~/components/partials/account/Register';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register an account',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Register">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"}/>
                    <Register />
                </div>
            </PageContainer>
        </>
    );
};

export default RegisterPage;
