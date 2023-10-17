import React, { useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';

const ProductDetailQuickView = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="ps-product--detail ps-product--quickview">
            <div className="ps-product__header">
                <ThumbnailDefault product={product} vertical={false} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} VariationIndex={0} />
                    <ModuleProductDetailDescription product={product} VariationIndex={0} />
                    <ModuleDetailShoppingActions
                        product={product}
                        extended={true}
                        VariationIndex={0}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                    {/* <ModuleProductDetailSpecification />
                <ModuleProductDetailSharing /> */}
                    <ModuleDetailActionsMobile />
                </div>
            </div>
        </div>
    )
};

export default ProductDetailQuickView;