import { Divider, InputNumber, Space } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import PageContainer from '~/components/layouts/PageContainer';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import useGetProducts from '~/hooks/useGetProducts';
import ProductRepository from '~/repositories/ProductRepository';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value === '' ? 0 : value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchPage = () => {
    const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const { productItems, loading, getProducts, setProductItems } = useGetProducts();
    const Router = useRouter();
    const { query } = Router;
    const debouncedMin = useDebounce(min, 500);
    const debouncedMax = useDebounce(max, 500);

    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);
        } else {
            setKeyword('');
        }
    }

    useEffect(() => {
        if (query && query.keyword) {
            handleSetKeyword(query.keyword);
            if (query.min) {
                setMin(query.min)
            }
            if (query.max) {
                setMax(query.max);
            }
            // const queries = {
            //     _limit: pageSize,
            //     title_contains: query.keyword,
            // };
            // getProducts(queries);
            const products = ProductRepository.getRecords(query.keyword, query.min ? query.min : '', query.max ? query.max : '', query.lat ? query.lat : '', query.lng ? query.lng : '', query.category ? query.category : '', query.subCategory ? query.subCategory : '');
            products.then((result) => {
                setProductItems(result);
            });
        }
    }, [query]);

    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Results',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (productItems) {
            shopItemsView = (
                <ProductGroupGridItems collectionSlug={"retailer"} columns={6} pageSize={pageSize} />
            );
            if (productItems.length > 0) {
                const items = productItems.map((item) => {
                    return (
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {productItems.length}
                        </strong>{' '}
                        record(s) found.
                    </p>
                );
            } else {
                shopItemsView = <p>No product(s) found.</p>;
            }
        } else {
            shopItemsView = <p>No product(s) found.</p>;
        }
    } else {
        statusView = <p>Searching...</p>;
    }

    useEffect(() => {
        console.log(debouncedMin)
        if (debouncedMin || debouncedMin == 0) {
            console.log('run')
            Router.replace({
                query: { ...Router.query, min: debouncedMin },
            });
        }
    }, [debouncedMin])

    useEffect(() => {
        if (debouncedMax) {
            Router.replace({
                query: { ...Router.query, max: debouncedMax },
            });
        }
    }, [debouncedMax])

    const onChange = (value) => {
        if (value >= 0) {
            setMin(value);
        }
    };

    const onChange2 = (value) => {
        if (value >= 0) {
            setMax(value);
        }
    };

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} layout={"fullwidth"} />
            </div>
            <div className="container-fluid">
                <div className="ps-shop ps-shop--search">
                    <div className="container-fluid">
                        <div className="ps-shop__header">
                            <h1>
                                Search result for: "<strong>{keyword}</strong>"
                            </h1>
                        </div>
                        <div className="ps-layout--shop">
                            <div className="ps-layout__left">
                                {/* <WidgetShopCategories role={"retailer"} type={""} /> */}
                                <h4>Price</h4>
                                <Space>
                                    <InputNumber
                                        size="large"
                                        style={{ width: '100%' }}
                                        defaultValue={0}
                                        placeholder={0}
                                        min={0}
                                        value={min}
                                        // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange}
                                    />
                                    <InputNumber
                                        size="large"
                                        style={{ width: '100%' }}
                                        defaultValue={10000000}
                                        placeholder={10000000}
                                        min={0}
                                        value={max}
                                        // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange2}
                                    />
                                </Space>
                                <Divider />
                                <WidgetShopCategories role={"retailer"} type="" search />
                            </div>
                            <div className="ps-layout__right">
                                {statusView}
                                {shopItemsView}
                            </div>
                        </div>
                        {/* <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                        </div> */}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
