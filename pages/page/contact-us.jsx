import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import ContactForm from '~/components/partials/page/ContactForm';
import ContactInfo from '~/components/partials/page/ContactInfo';
import ContactMap from '~/components/partials/page/ContactMap';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const ContactUsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'ContactUs',
        },
    ];

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Contact Us">
            <div className="ps-page--single" id="contact-us">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth"/>
                <ContactMap />
                <ContactInfo />
                {/* <ContactForm /> */}
            </div>
        </PageContainer>
    );
};

export default ContactUsPage;
