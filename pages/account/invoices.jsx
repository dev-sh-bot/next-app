
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Invoices from '~/components/partials/account/Invoices';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const InvoicePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Invoices',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Invoices">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Invoices />
                </div>
            </PageContainer>
        </>
    );
};

export default InvoicePage;
