import React from 'react';
import Link from 'next/link';
import { baseUrlImageNew } from '~/repositories/Repository';

const MegaMenu = ({ source ,slug }) => {
    // console.log("Megamenu run", source)
    // console.log("image", baseUrlImageNew + source.image)
    let megaContentView;
    if (source) {
        // megaContentView = source.sub_category.map((item) => (
        megaContentView = <div className="mega-menu__column">
            <h4>{source.name}</h4>
            <ul className="mega-menu__list">
                {source.sub_category.map((subItem) => (
                    <li key={subItem.id}>
                        <Link href={`/subcategory/${subItem.id},${subItem.category_id}?role=${slug}`} as={`/subcategory/${subItem.id},${subItem.category_id}?role=${slug}`}>
                            <a>{subItem.image && <img src={baseUrlImageNew + subItem.image} alt="icon" width={"30"}/>} &nbsp;{subItem.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        // ));
    }
    return (
        <li className="menu-item-has-children has-mega-menu">
            <Link href={source.id !== '' ? `category/${source.id}?role=${slug}` : '/'}>
                <a>
                    {source.image && <img src={baseUrlImageNew + source.image} alt="icon" width={"30"}/>}
                    &nbsp;{source.name}
                </a>
            </Link>
            <div className="mega-menu">{megaContentView}</div>
        </li>
    );
};

export default MegaMenu;
