import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = ({ role, type, search }) => {
    const Router = useRouter();
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    // console.log("categories", categories)
    const { slug } = Router.query;


    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getProductCategories();
        if (responseData) {
            setCategories(responseData.Category);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const selectCategory = (e) => {
        Router.replace({
            query: { ...Router.query, category: e },
        });
    }

    const selectSubCategory = (e) => {
        Router.replace({
            query: { ...Router.query, subCategory: e },
        });
    }

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li
                    key={item.id}
                    className={item.id == slug ? 'active' : ''}>
                    <Link href={`/category/${item.id}?role=${role}&&type=${type}`}>{item.name}</Link>
                    <ul className="ps-list--subcategories" style={{ listStyle: "circle", marginLeft: "30px" }}>
                        {item.sub_category.map((e) => (
                            slug?.length > 1 ?
                                <li key={e.id} className={e.id == slug[2] ? 'active' : ''}>
                                    <Link href={`/subcategory/${e.id},${e.category_id}?role=${role}&&type=${type}`}>{e.name}</Link>
                                </li>
                                :
                                <li key={e.id}>
                                    <Link href={`/subcategory/${e.id},${e.category_id}?role=${role}&&type=${type}`}>{e.name}</Link>
                                </li>
                        )
                        )}
                    </ul>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    // Search Views

    let categoriesViewSearch;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li
                    key={item.id}
                    className={item.id == slug ? 'active' : ''}>
                    <a onClick={() => selectCategory(item.id)}>{item.name}</a>
                    <ul className="ps-list--subcategories" style={{ listStyle: "circle", marginLeft: "30px" }}>
                        {item.sub_category.map((e) => (
                            slug?.length > 1 ?
                                <li key={e.id} className={e.id == slug[2] ? 'active' : ''}>
                                    <a onClick={() => selectSubCategory(e.id)}>{e.name}</a>
                                </li>
                                :
                                <li key={e.id}>
                                    <a onClick={() => selectSubCategory(e.id)}>{e.name}</a>
                                </li>
                        )
                        )}
                    </ul>
                </li>
            ));
            categoriesViewSearch = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesViewSearch = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {search ? categoriesViewSearch : categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
