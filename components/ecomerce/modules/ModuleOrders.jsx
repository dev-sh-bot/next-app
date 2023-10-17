import { Divider, Result } from 'antd';
import { connect } from 'react-redux';
import ProductCartOrder from '~/components/elements/products/ProductCartOrder';

const ModuleEcomerceCartItems = ({ AllOrders, refund }) => {
    // View
    console.log("AllOrders", AllOrders)
    let cartItemsViews;
    if (AllOrders && AllOrders.length > 0) {
        cartItemsViews = (
            AllOrders.map((items) => (
                <div key={items.id}>
                    <div className="row">
                        <div className="col-md-4">
                            <h5 className='text-muted text-capitalize'><span className='text-dark font-weight-bold'>Order No:</span> {items.order_number}</h5>
                            <h5 className='text-muted text-capitalize'><span className='text-dark font-weight-bold'>Shop:</span> {items.seller.username}</h5>
                            <h5 className='text-muted text-capitalize'><span className='text-dark font-weight-bold'>Order Date:</span> {items.order_date}</h5>
                        </div>
                        {/* <div className="col-md-4 text-center">
                        </div>
                        <div className="col-md-4 text-right">
                        </div> */}
                    </div>
                    <table className="table  ps-table--shopping-cart ps-table--responsive">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.order_products.map((e) => (
                                <tr key={e.id}>
                                    <td>
                                        {e.products !== null ?
                                            <ProductCartOrder product={e.products} />
                                            :
                                            null
                                        }
                                    </td>
                                    <td data-label="price">
                                        Rs{Number(e.product_price) - (Number(e.discount) / Number(e.qty))}
                                    </td>
                                    <td data-label="quantity">
                                        {e.qty}
                                    </td>
                                    <td data-label="size">
                                        {e.size}
                                    </td>
                                    <td data-label="total">
                                        Rs{e.subtotal - e.discount}
                                    </td>
                                    <td data-label="status">
                                        <strong>pending</strong>
                                    </td>
                                    <td className='text-center' onClick={() => refund(items.id)}>
                                        <a className='ps-btn' href='#'>
                                            Refund
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Divider />
                </div>
            ))
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
