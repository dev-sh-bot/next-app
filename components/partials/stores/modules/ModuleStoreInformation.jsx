import React from 'react';
// import Rating from '~/components/elements/Rating';
import { baseUrlImageNew } from '~/repositories/Repository';

const ModuleStoreInformation = ({ store }) => {
    console.log("store ", store)
    if (store) {
        return (
            <div className="ps-block--vendor">
                <div className="ps-block__thumbnail">
                    <img
                        src={baseUrlImageNew + store.bill_image}
                        alt="Real_Bazar"
                        height={350}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className="ps-block__container">
                    <div className="ps-block__header">
                        <h4>{store.business_name}</h4>
                    </div>
                    <div className="ps-block__divider"></div>
                    <div className="ps-block__footer">
                        <p>
                            Business name
                            <strong>{store.business_name}</strong>
                        </p>
                        <p>
                            City
                            <strong>{store.province}</strong>
                        </p>
                        <p>
                            Address
                            <strong>{store.business_address}</strong>
                        </p>
                        {store.shop_number !== null && store.shop_number !== "null" ? <>
                            <p>
                                Market Name
                                <strong>{store.market_name !== "null" ? store.market_name : ""}</strong>
                            </p>
                            <p>
                                Market Number
                                <strong>{store.shop_number !== "null" ? store.shop_number : ""}</strong>
                            </p>
                        </>
                            : null}
                    </div>
                </div>
            </div>
        );
    } else {
        return;
    }
};

export default ModuleStoreInformation;
