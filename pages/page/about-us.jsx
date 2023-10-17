
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const AboutUsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'About Us',
        },
    ];
    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="About Us">
            <div className="ps-page--single">
                <div className="container-fluid">
                <img src="/static/img/bg/about-us.jpg" alt=""/>
                </div>
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth"/>
                <OurTeam />
                <AboutAwards />
            </div>
        </PageContainer>
    );
};
export default AboutUsPage;
