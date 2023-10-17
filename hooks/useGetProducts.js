import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [TotalCount, setTotalCount] = useState(null);
    const [product, setProduct] = useState(null);
    return {
        loading,
        productItems,
        TotalCount,
        product,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductsByCategory: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCategoriesHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProducts: async (payload,slug) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload,slug);
            } else {
                const queries = "0/12"
                responseData = await ProductRepository.getProducts(queries,slug);
            }
            if (responseData) {
                setProductItems(responseData.Products);
                setTotalCount(responseData.ProductsCount);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getSlugsProducts: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getSlugProducts(payload);
            }
            if (responseData) {
                setProductItems(responseData.Products);
                setTotalCount(responseData.ProductsCount);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
