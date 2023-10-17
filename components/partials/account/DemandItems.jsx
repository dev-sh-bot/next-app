import useProduct from '~/hooks/useProduct';

export default function DemandItems({ product }) {
    const { thumbnailDemadProduct } = useProduct();
    return (<>
        {product && product.length > 0 ?
            product.map((e,i) => {
                return (
                    <div className="ps-product--demand mb-3" key={i}>
                        <div className="ps-product__thumbnail">
                            <span>{thumbnailDemadProduct(e)}</span>
                        </div>
                        <div className="ps-product__container align-items-center">
                            <div className="ps-product__content">
                                <span className="ps-product__title">{e.name}</span>
                                <p className="ps-product__vendor">
                                    <span>{e.phone}</span>
                                </p>
                                <p>Quantity: {e.qty}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            :
            <p>No Demand Request</p>
        }
    </>
    )
}
