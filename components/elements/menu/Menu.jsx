import React from 'react';
import Link from 'next/link';
import MenuDropdown from '~/components/elements/menu/MenuDropdown';
import MegaMenu from '~/components/elements/menu/MegaMenu';

const Menu = ({ source, className,slug }) => { 
    // Views
    let menuView;
    if (source) {
        menuView = source.map((item) => {
            if (item.megaContent) {
                return <MenuDropdown source={item} key={item.text} />;
            } else if (item.sub_category) {
                return <MegaMenu source={item} key={item.id} slug={slug}/>;
            } else {
                return (
                    <li key={item.name}>
                        <Link href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.name}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
