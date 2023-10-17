import React from 'react';
import Link from 'next/link';

const AccountMenuSidebar = ({ data, Username, handleLogout }) => (
    <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
            <img src="/static/img/users/1.png" />
            <figure>
                <figcaption>Hello</figcaption>
                <p>{Username}</p>
            </figure>
        </div>
        <div className="ps-widget__content">
            <ul>
                {data.map(link => (
                    <li key={link.text} className={link.active ? 'active' : ''}>
                        <Link href={link.url}>
                            <a>
                                <i className={link.icon}></i>
                                {link.text}
                            </a>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="">
                        <a onClick={handleLogout}>
                            <i className='icon-power-switch' />
                            Logout
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
);

export default AccountMenuSidebar;
