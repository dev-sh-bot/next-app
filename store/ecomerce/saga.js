import { all, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './action';

import {
    updateCartSuccess,
    updateCartError,
    setCartItemsSuccess,
    setWishlistTtemsSuccess,
    setCompareItemsSuccess,
    setOrders,
} from './action';

// new
function* getWishlistItems({ payload }) {
    try {
        yield put(setWishlistTtemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartItems({ payload }) {
    // console.log("cartpayload",payload)
    try {
        yield put(setCartItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getOrderss({ payload }) {
    // console.log("orderpayload",payload)
    try {
        yield put(setOrders(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCompareItems({ payload }) {
    try {
        yield put(setCompareItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    // new
    yield all([takeEvery(actionTypes.SET_WISHLIST_ITEMS, getWishlistItems)]);
    yield all([takeEvery(actionTypes.SET_CART_ITEMS, getCartItems)]);
    yield all([takeEvery(actionTypes.SET_COMPARE_ITEMS, getCompareItems)]);
    yield all([takeEvery(actionTypes.SET_ORDERS, getOrderss)]);
}
