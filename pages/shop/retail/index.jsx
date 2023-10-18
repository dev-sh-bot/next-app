import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import ShopItems from '~/components/partials/shop/ShopItems';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';

const RetailerShop = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
        },
    ];

    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="container-fluid">
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories role={"retailer"} type=""/>
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems columns={6} pageSize={12} slug={"retailer"} />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default RetailerShop;
