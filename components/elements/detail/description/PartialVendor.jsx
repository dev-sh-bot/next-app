import React from 'react';

const PartialVendor = ({ product }) => (
    <section>
        <div className="table-responsive">
            <table className="table table-bordered ps-table ps-table--specification">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{product.shop.username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{product.shop.email}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{product.shop.phone}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{product.shop.country}</td>
                    </tr>
                    <tr>
                        <td>Province</td>
                        <td>{product.shop.province}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);

export default PartialVendor;
