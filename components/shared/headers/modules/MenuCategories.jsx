import React, { useEffect, useState } from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import CollectionRepository from '~/repositories/CollectionRepository';
import { Skeleton } from 'antd';

const MenuCategories = ({slug}) => {
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        CollectionRepository.getCategories().then((e) => {
            setCategories(e);
        });
    }

    // console.log("menuData.product_categories",menuData.product_categories)
    // console.log("Categories",Categories)

    return (
        Categories.length > 0
            ?
            <Menu source={Categories} className="menu--dropdown" slug={slug}/>
            :
            <Skeleton active  paragraph={{ rows: 16 }} />
    )
};

export default MenuCategories;
