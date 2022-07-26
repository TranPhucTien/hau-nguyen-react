import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
    const cartTotal = useSelector(cartTotalSelector);

    return (
        <div>
            Cart Feature
            <h2>{cartTotal}</h2>
        </div>
    );
}

export default CartFeature;
