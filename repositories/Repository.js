import axios from 'axios';
const baseDomain = 'https://beta.apinouthemes.com'; // API for products
export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)

// export const baseUrlNew = 'https://realbazarapi.icotsolutions.com/api'; // local
export const baseUrlNew = 'https://api.realbazar.pk/api'; // live
// export const baseUrlImageNew = 'https://realbazarapi.icotsolutions.com/storage/'; // local
export const baseUrlImageNew = 'https://api.realbazar.pk/storage/'; // live

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
