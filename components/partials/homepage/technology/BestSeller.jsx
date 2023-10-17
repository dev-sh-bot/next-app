import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import CollectionRepository from '~/repositories/CollectionRepository';
import { baseUrlImageNew } from '~/repositories/Repository';

const BestSeller = ({collectionSlug}) => {
    const [TopSellers, setTopSellers] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        CollectionRepository.getTopSalesSeller(collectionSlug).then((e) => {
            // console.log("getTopSalesSeller", e);
            setTopSellers(e)
        });
    }
    return (
        <div className="ps-best-sale-brands ps-section--furniture">
            <div className="container-fluid">
                <div className="ps-section__header">
                    <h3>BEST SELLER BRANDS</h3>
                </div>
                <div className="ps-section__content">
                    <ul className="ps-image-list">
                        {TopSellers.map((e, i) => (
                            <li key={i}>
                                <Link href={`store/${e.id}`} to="/store/[slug]">
                                    <a className='d-flex flex-column justify-content-center align-items-center'>
                                    {e.image?
                                        <img src={baseUrlImageNew + e.image} alt="Real_Bazar" style={{ width: 100, height: 100, objectFit: "cover" }} />
                                        :
                                        <img src={`static/img/default-shop.jpg`} alt="Real_Bazar" style={{ width: 170, height: 100, objectFit: "cover" }} />
                                    }
                                        <h4 className='text-muted text-center mt-2'>Shop: {e.business_name}</h4>
                                    </a>
                                </Link>{' '}
                            </li>
                        ))}
                        {/* <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-1.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-2.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-3.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-4.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-5.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-6.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-7.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-8.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-9.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/static/img/brand/2-10.jpg" alt="Real_Bazar" />{' '}
                            </a>
                        </Link>{' '}
                    </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default BestSeller;
