import axios from 'axios';

export default class Http {
    static get(url) {
        return axios.get(url);
    };

    static post(url, body, ...rest) {
        return axios.post(url, body, rest);
    };
};