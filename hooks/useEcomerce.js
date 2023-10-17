import { Modal } from 'antd';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import notificationAlert from '~/components/utils/notificationAlert';
import ProductRepository from '~/repositories/ProductRepository';
import {
    setCartItems, setCompareItems, setOrders, setWishlistTtems
} from '~/store/ecomerce/action';

export default function useEcomerce() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    return {
        loading,
        cartItemsOnCookie,
        products,
        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (payload && payload.length > 0) {
                let queries = '';
                // console.log("payload",payload)
                payload.forEach((item) => {
                    if (queries === '') {
                        queries = `${item.id}`;
                    } else {
                        queries = queries + `, ${item.id}`;
                    }
                });
                const responseData = await ProductRepository.getProductsByIds(
                    queries
                );
                // console.log("responseData",responseData)
                if (responseData && responseData.length > 0) {
                    if (group === 'cart') {
                        let cartItems = responseData;
                        payload.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
                            if (existItem) {
                                existItem.quantity = item.quantity;
                                existItem.variationIndex = item.variationIndex;
                            }
                        });

                        setProducts(cartItems);
                    } else {
                        setProducts(responseData);
                    }
                    setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
                }
            } else {
                setLoading(false);
                setProducts([]);
            }
        },

        increaseQty: (payload, currentCart) => {
            let cart = [];
            if (currentCart) {
                cart = currentCart;
                const existItem = cart.find((item) => item.id === payload.id);
                if (existItem) {
                    existItem.quantity = existItem.quantity + 1;
                }
                setCookie('cart', cart, { path: '/' });
                dispatch(setCartItems(cart));
            }
            return cart;
        },

        decreaseQty: (payload, currentCart) => {
            let cart = [];
            if (currentCart) {
                cart = currentCart;
                const existItem = cart.find((item) => item.id === payload.id);
                if (existItem) {
                    if (existItem.quantity > 1) {
                        existItem.quantity = existItem.quantity - 1;
                    }
                }
                setCookie('cart', cart, { path: '/' });
                dispatch(setCartItems(cart));
            }
            return cart;
        },

        addItem: async (newItem, items, group) => {
            let newItems = [];
            // console.log("items", items)
            // console.log("newItem", newItem)


            if (items.length > 0) {
                const sameShop = items.find((item) => item.shopId === newItem.shopId);
                if (sameShop) {
                    if (items) {
                        newItems = items;
                        const existItem = items.find((item) => item.id === newItem.id);
                        if (existItem) {
                            if (group === 'cart') {
                                if (existItem.quantity < newItem.stock) {
                                    existItem.quantity += newItem.quantity;
                                } else {
                                    notificationAlert("info", "Opps!", "Quantity not available")
                                }
                            }
                        } else {
                            newItems.push(newItem);
                            if (group === 'cart') {
                                const modal = Modal.success({
                                    centered: true,
                                    title: 'Success!',
                                    content: `This item has been added to your cart`,
                                });
                                modal.update;
                            }
                        }
                    } else {
                        newItems.push(newItem);
                        if (group === 'cart') {
                            const modal = Modal.success({
                                centered: true,
                                title: 'Success!',
                                content: `This item has been added to your cart`,
                            });
                            modal.update;
                        }
                    }
                    if (group === 'cart') {
                        setCookie('cart', newItems, { path: '/' });
                        dispatch(setCartItems(newItems));
                    }
                } else {
                    notificationAlert("info", "Opps!", "You can order only one seller at a time")
                }
            } else {
                if (items) {
                    newItems = items;
                    const existItem = items.find((item) => item.id === newItem.id);
                    if (existItem) {
                        if (group === 'cart') {
                            existItem.quantity += newItem.quantity;
                        }
                    } else {
                        newItems.push(newItem);
                    }
                } else {
                    newItems.push(newItem);
                }
                if (group === 'cart') {
                    setCookie('cart', newItems, { path: '/' });
                    dispatch(setCartItems(newItems));
                }
                if (newItem !== "") {
                    if (group === 'cart') {
                        const modal = Modal.success({
                            centered: true,
                            title: 'Success!',
                            content: `This item has been added to your cart`,
                        });
                        modal.update;
                    }
                }
            }


            // if (items) {
            //     newItems = items;
            //     const existItem = items.find((item) => item.id === newItem.id);
            //     if (existItem) {
            //         if (group === 'cart') {
            //             existItem.quantity += newItem.quantity;
            //         }
            //     } else {
            //         newItems.push(newItem);
            //     }
            // } else {
            //     newItems.push(newItem);
            // }
            // if (group === 'cart') {
            //     setCookie('cart', newItems, { path: '/' });
            //     dispatch(setCartItems(newItems));
            // }
            if (group === 'emptyCart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
            if (group === 'wishlist') {
                setCookie('wishlist', newItems, { path: '/' });

                dispatch(setWishlistTtems(newItems));
            }

            if (group === 'compare') {
                setCookie('compare', newItems, { path: '/' });
                dispatch(setCompareItems(newItems));
            }
            if (group === 'orders') {
                // console.log("orderrun")
                setCookie('orders', newItems, { path: '/' });
                dispatch(setOrders(newItems));
            }
            return newItems;
        },

        removeItem: (selectedItem, items, group) => {
            let currentItems = items;
            if (currentItems.length > 0) {
                const index = currentItems.findIndex(
                    (item) => item.id === selectedItem.id
                );
                currentItems.splice(index, 1);
            }
            if (group === 'cart') {
                setCookie('cart', currentItems, { path: '/' });

                dispatch(setCartItems(currentItems));
            }

            if (group === 'wishlist') {
                setCookie('wishlist', currentItems, { path: '/' });
                dispatch(setWishlistTtems(currentItems));
            }

            if (group === 'compare') {
                setCookie('compare', currentItems, { path: '/' });
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'compare') {
                setCookie('compare', [], { path: '/' });
                dispatch(setCompareItems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },
    };
}
