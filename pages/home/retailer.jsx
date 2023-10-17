import Link from 'next/link'
import { useEffect, useState } from 'react'
import AdsSlider from '~/components/partials/ads/slider'
import MartketPlace3Banner from '~/components/partials/homepage/marketplace3/MartketPlace3Banner'
import BestSeller from '~/components/partials/homepage/technology/BestSeller'
import CustomShowProducts from '~/components/partials/homepage/technology/customShowProducts'
import TechnologyCategories from '~/components/partials/homepage/technology/TechnologyCategories'
import ShopItemsHome from '~/components/partials/shop/ShopItemsHome'
import ApiCaller from '~/repositories/ApiCaller'
import { baseUrlImageNew } from '~/repositories/Repository'


export default function Retailer() {
    const goodPriceLinks = [
        'Headphone',
        'Charge',
        'Case USB',
        'Hard Driver',
        'TV Box',
    ];

    const [Banner_header, setBanner_header] = useState([])
    const [Banner_body, setBanner_body] = useState([])
    const [Banner_footer, setBanner_footer] = useState([])
    const [NewArrival, setNewArrival] = useState([])
    const [DiscountProduct, setDiscountProduct] = useState([])
    const [FeatureProduct, setFeatureProduct] = useState([])
    const [TopRatingProduct, setTopRatingProduct] = useState([])
    const [RelatedIntrest, setRelatedIntrest] = useState([])
    const [TopTrending, setTopTrending] = useState([])
    const [JustForYou, setJustForYou] = useState([])
    const [JustForYouSlider, setJustForYouSlider] = useState([])
    const [TopSeller, setTopSeller] = useState([])


    // const UserObj = JSON.parse(window.localStorage.getItem("realBazarUserObj"))
    // console.log("UserObj",UserObj)
    const [UserObj, setUserObj] = useState({});
    useEffect(() => {
        const UserObjs = JSON.parse(window.localStorage.getItem("realBazarUserObj"))
        setUserObj(UserObjs)
        getHomeData()
    }, [])

    const getHomeData = () => {
        const endPoint = `/webhome/retailer`;
        ApiCaller.Get(endPoint).then((response) => {
            if (response.data) {
                const Data = response.data
                // console.log("homeData", Data)
                setBanner_header(Data.banner_header);
                setBanner_body(Data.banner_body);
                setBanner_footer(Data.banner_footer);
                setNewArrival(Data.newArrivalProduct);
                setDiscountProduct(Data.discount_product);
                setFeatureProduct(Data.feature_product);
                setTopRatingProduct(Data.topRatingProduct)
                setTopTrending(Data.trendingProduct)
                setJustForYou(Data.justForYouProduct)
                setJustForYouSlider(Data.justForYouSlider)
                setTopSeller(Data.bestSeller)
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    return (
        <main id="homepage-10">
            {/* <TechnologyBanner /> */}
            <div id="homepage-5">
                <MartketPlace3Banner slug={"retail"} role={"retailer"} userRole={UserObj} slider={JustForYouSlider} images={JustForYou} />
            </div>
            <div className="container-fluid pt-5">
                <div className='row'>
                    <div className='col-md-4 text-center d-flex flex-column justify-content-between'>
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="discount"
                            title="DISCOUNTED Products"
                            HomeData={DiscountProduct}
                            userRole={UserObj}
                        />
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="topRating"
                            title="TOP Ranking"
                            HomeData={TopRatingProduct}
                            userRole={UserObj}
                        />
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="newArrival"
                            title="New Arrival"
                            HomeData={NewArrival}
                            userRole={UserObj}
                        />
                    </div>
                    <div className="col-md-4 text-center d-flex flex-column justify-content-center">
                        <div className="card" style={{ border: "2px solid silver", borderRadius: "3.25rem", height: '-webkit-fill-available' }}>
                            <div className="card-body ">
                                <h3>TOP SELLERS</h3>
                                {TopSeller.map((e, i) => (
                                    <a href={e.url} target="_blank" key={i}>
                                        <div className="card-body" >
                                            <img src={baseUrlImageNew + e.image} alt="TopSellerbanner" style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                                        </div>
                                    </a>
                                ))}
                            </div>
                            {/* <div className="card-body ">
                                <h3>TOP SELLERS</h3>
                                <img src="/static/img/products/description.jpg" alt="Sellerbanner" />
                            </div>
                            <div className="card-body">
                                <img src="/static/img/products/description.jpg" alt="Sellerbanner" />
                            </div>
                            <div className="card-body">
                                <img src="/static/img/products/description.jpg" alt="Sellerbanner" />
                            </div> */}
                        </div>
                    </div>
                    <div className='col-md-4 text-center d-flex flex-column justify-content-between'>
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="featured"
                            title="FEATURE Products"
                            HomeData={FeatureProduct}
                            userRole={UserObj}
                        />
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="discount"
                            title="RELATED to your interest"
                            HomeData={DiscountProduct}
                            userRole={UserObj}
                        />
                        <CustomShowProducts
                            collectionSlug="retailer"
                            categorySlug="trending"
                            title="TOP Trending"
                            HomeData={TopTrending}
                            userRole={UserObj}
                        />
                    </div>
                </div>
            </div>
            <BestSeller collectionSlug="retailer" />
            {/* <TechnologyCategories /> */}
            <AdsSlider Data={Banner_body} />
            {/* <TechnologyProductGroupWithCarousel
                collectionSlug="retailer"
                title="DISCOUNTED PRODUCTS"
                links={goodPriceLinks}
            />
            <AdsSlider Data={Banner_footer} /> */}
            {/* <TechnologyProductGroupWithCarousel
                collectionSlug="retailer"
                title="JUST FOR YOU"
                links={goodPriceLinks}
                userRole={UserObj}
            /> */}
            <div className='container-fluid'>
                <ShopItemsHome columns={6} pageSize={12} slug={"retailer"} userRole={UserObj} />
            </div>
        </main>
    )
}
