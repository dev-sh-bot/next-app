import { Radio } from 'antd'
import React from 'react'

export default function ModuleProductVariation({ variation, VariationIndex, setVariationIndex, setQuantity }) {
    const onChange = ({ target: { value } }) => {
        console.log('radio4 checked', value);
        setVariationIndex(value)
        setQuantity(1);
        // setValue4(value);
    };
    return (<>
        <p>Variations</p>
        <Radio.Group
            value={VariationIndex}
            onChange={onChange}
            buttonStyle={"solid"}
            style={{
                marginBottom: 16,
            }}
            defaultValue={"0"}
        >
            {variation.length > 0 ?
                variation.map((e, i) => (
                    <Radio.Button key={i} value={i}>{e.size}</Radio.Button>
                )) : null}
        </Radio.Group>
    </>
    )
}
