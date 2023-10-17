import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Wishlist from '~/components/partials/account/Wishlist';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const WishlistPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Wishlist',
        },
    ];

    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Wishlist">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} layout={"fullwidth"}/>
                <Wishlist />
            </div>
        </PageContainer>
    );
};

export default WishlistPage;
