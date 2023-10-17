import React from 'react';
import Link from 'next/link';

const MenuDropdown = ({ source }) => {
    return (
        <li className="menu-item-has-children dropdown">
            {
                <Link href={source.url}>
                    <a>{source.name}</a>
                </Link>
            }
            {/* mega-menu */}
            {source.sub_category && (
                // <ul className={source.subClass}>
                <ul className="sub-menu">
                    {source.sub_category.map((subMenuItem, index) => (
                        <MenuDropdown source={subMenuItem} key={index} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default MenuDropdown;
