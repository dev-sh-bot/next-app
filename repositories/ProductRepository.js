import ApiCaller from './ApiCaller';
import Repository, { baseUrl, baseUrlNew, serializeQuery } from './Repository';

class ProductRepository {
    async getRecords(params, min, max, lat, lng, categoryId, subCategoryId) {
        const formdata = new FormData();
        formdata.append("name", params)
        formdata.append("lat", lat)
        formdata.append("lng", lng)
        formdata.append("distance", 50)
        formdata.append("category", categoryId)
        formdata.append("sub_category", subCategoryId)
        formdata.append("price_from", min)
        formdata.append("price_to", max)
        const reponse = await Repository.post(`${baseUrlNew}/search`, formdata).then((response) => {
            return response.data.Products;
        }).catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getSearch(params) {
        const reponse = await Repository.get(
            // `${baseUrl}/products?${serializeQuery(params)}`
            `${baseUrlNew}/search/${params}`
        )
            .then((response) => {
                return response.data.Products;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProducts(params, slug) {
        // console.log("slug",slug)
        const reponse = await Repository.get(
            // `${baseUrl}/products?${serializeQuery(params)}`
            `${baseUrlNew}/products/${slug}/${params}`
        ).then((response) => {
            if (response.data && response.data.Products.length > 0) {
                return response.data;
            } else {
                return null;
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
        return reponse;
    }

    async getSlugProducts(params) {
        const reponse = await Repository.get(
            `${baseUrlNew}${params}`
        ).then((response) => {
            if (response.data && response.data.Products.length > 0) {
                return response.data;
            } else {
                return null;
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
        return reponse;
    }

    async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories() {
        const reponse = await Repository.get(`${baseUrlNew}/category`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsById(payload) {
        const reponse = await Repository.get(`${baseUrl}/products/${payload}/0/10`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getSearchProducts(payload) {
        const reponse = await Repository.get(
            `${baseUrlNew}/search/${payload}`
        )
            .then((response) => {
                if (response.data.status) {
                    if (response.data.Products.length > 0) {
                        return response.data;
                    }
                } else {
                    return response.data;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach((item) => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByPriceRange(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsByIds(payload) {
        const endPoint = `/show/product`;
        let formData = new FormData()
        formData.append("id", payload)
        const reponse = await ApiCaller.Post(endPoint, formData)
            .then((response) => {
                if (response.data && response.data.Products.length > 0) {
                    return response.data.Products;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async checkout(endPoint, payload) {
        console.log("payload", payload)
        let token = localStorage.getItem("realBazarUsertoken");
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("price", payload)
        const reponse = await ApiCaller.Post(endPoint, formData, BearerHeaders)
            .then((response) => {
                // console.log("response",response)
                return response.data
                // if (response.data && response.data.Products.length > 0) {
                // if (response.data && response.data.Products.length > 0) {
                //     return response.data.Products;
                // } else {
                //     return null;
                // }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async placedOrder(payload) {
        const endPoint = `/order`;
        let token = localStorage.getItem("realBazarUsertoken");
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        // let formData = new FormData()
        // formData.append("id",payload)
        const reponse = await ApiCaller.Post(endPoint, payload, BearerHeaders)
            .then((response) => {
                // console.log("response",response)
                return response.data
                // if (response.data && response.data.Products.length > 0) {
                // if (response.data && response.data.Products.length > 0) {
                //     return response.data.Products;
                // } else {
                //     return null;
                // }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getProductsByCategory(payload, slugtype, role, type, payload2) {
        // console.log("payload",payload)
        const endPoint = `/search/category`;
        let formData = new FormData()
        if (slugtype === "category") {
            formData.append("category_id", payload)
        } else {
            formData.append("category_id", payload2)
            formData.append("subcategory_id", payload)
        }
        formData.append("role", role)
        formData.append("skip", "0")
        formData.append("take", "15")
        if (type) {
            formData.append("type", type == "undefined" ? "" : type)
        } else {
            formData.append("type", "")
        }

        const reponse = await ApiCaller.Post(endPoint, formData)
            .then((response) => {
                // console.log("hjasdh",response)
                const Data = response.data
                if (Data && Data.Product.length > 0) {
                    return Data;
                } else {
                    return Data;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new ProductRepository();
