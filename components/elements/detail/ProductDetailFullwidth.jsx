import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductVariation from './modules/ModuleProductVariation';
import { useState } from 'react';

const ProductDetailFullwidth = ({ product, ecomerce }) => {
    // console.log("ecomerce ", ecomerce )
    console.log("product", product)
    const [VariationIndex, setVariationIndex] = useState(0)
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} VariationIndex={VariationIndex} />
                    <ModuleProductDetailDescription product={product} />
                    <ModuleProductVariation variation={product.variation} VariationIndex={VariationIndex} setVariationIndex={setVariationIndex} setQuantity={setQuantity} />
                    <ModuleDetailShoppingActions product={product} VariationIndex={VariationIndex} quantity={quantity} setQuantity={setQuantity} />
                    {/* <ModuleProductDetailSpecification /> */}
                    <ModuleProductDetailSharing />
                    <ModuleDetailActionsMobile product={product} VariationIndex={VariationIndex} quantity={quantity} setQuantity={setQuantity} />
                    <DefaultDescription product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailFullwidth;
