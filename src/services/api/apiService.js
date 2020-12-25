import axios from 'axios';

// const baseUrl = `${process.env.REACT_APP_BASE_URL}/api`;
// const baseUrl = `http://localhost:5000/api`;
const baseUrl = `https://mytwitterappapi.herokuapp.com/api`;
axios.defaults.baseURL = baseUrl;


export const buildBaseConfig = () => {
    return {
        timeout: 3000,
        headers: {
            'Content-Type': 'application/json',
            withCredentials: true
        }
    };
};

export async function get(url, param) {
    return axios.request({
        ...buildBaseConfig(),
        baseUrl,
        method: 'get',
        url,
        param,
        withCredentials: true
    });
}

export async function del(url, param) {
    return axios.request({
        ...buildBaseConfig(),
        baseUrl,
        method: 'delete',
        url,
        data: param,
        withCredentials: true
    });
}

export async function post(url, payload) {

    return axios.request({
        ...buildBaseConfig(),
        baseUrl,
        method: 'post',
        url,
        data: payload,
        withCredentials: true
    });
};


