import React from 'react';

const Rating = ({ rate, noRate }) => (
    <span className="ps-rating">
        {new Array(rate).fill().map((e, i) => (
            <i className="fa fa-star" key={i}></i>
        ))}
        {new Array(noRate).fill().map((e, i) => (
            <i className="fa fa-star-o" key={i}></i>
        ))}
    </span>
);

export default Rating;