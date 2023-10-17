import Repository, { baseUrl, baseUrlNew } from './Repository';

class CollectionRepository {
    async getCollections(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/collections?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCategoriesBySlug(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?${query}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByCollectionSlug(slug) {
        const reponse = await Repository.get(
            // `${baseUrl}/collections?slug_in=${slug}`
            `${baseUrlNew}/products/${slug}/0/10`
        )
            .then((response) => {
                if (response.data) {
                    return { items: response.data.Products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getTopSalesSeller(collectionSlug) {
        const reponse = await Repository.get(
            `${baseUrlNew}/seller/top/sales/${collectionSlug}`
        ).then((response) => {
            if (response.data && response.data.seller_top_sales) {
                return response.data.seller_top_sales;
            } else {
                return [];
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return [];
        });
        return reponse;
    }

    async getCategories() {
        const reponse = await Repository.get(
            `${baseUrlNew}/category`
        ).then((response) => {
            // console.log("response", response)
            if (response.data.Category && response.data.Category.length > 0) {
                return response.data.Category;
            } else {
                return [];
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return [];
        });
        return reponse;
    }
}

export default new CollectionRepository();
