import PropTypes from "prop-types";
import React, { Fragment } from "react";

const ProductRatingDecimal = ({ ratingValue }) => {
    let rating = [];
    let fullStars = Math.floor(ratingValue);
    let halfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        rating.push(<i className="far fa-star" key={i}></i>); // empty star
    }

    for (let i = 0; i < fullStars; i++) {
        rating[i] = <i className="fas fa-star yellow" key={i}></i>; // filled star
    }

    if (halfStar) {
        rating[fullStars] = <i className="fas fa-star-half-alt yellow" key={fullStars}></i>; // half-filled star
    }

    return <Fragment>{rating}</Fragment>;
};

ProductRatingDecimal.propTypes = {
    ratingValue: PropTypes.number
};

export default ProductRatingDecimal;
