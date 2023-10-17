import ApiCaller from './ApiCaller';
import Repository, { baseStoreURL, serializeQuery } from './Repository';

class StoreRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getStores(payload) {
        const endPoint = `stores?${serializeQuery(payload)}`;
        const reponse = await Repository.get(`${baseStoreURL}/${endPoint}`)
            .then((response) => {
                if (response.data.length > 0) {
                    return response.data;
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

    async getStoreBySlug(payload) {
        const endPoint = `/shop/product`;
        let formData = new FormData()
        formData.append("id", payload)
        const reponse = await ApiCaller.Post(endPoint, formData)
            .then((response) => {
                // const reponse = await Repository.get(
                //     `${baseStoreURL}/stores?slug=${payload}`
                // )
                //     .then((response) => {
                if (response.data.status) {
                    return response.data;
                } else {
                    return response.data;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getStoreItemsByKeyword(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getPostItemsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseStoreURL}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new StoreRepository();
