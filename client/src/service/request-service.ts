import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../constants/constants';

const attachBaseUrl = (url: string) => {
    return `${BASE_URL}/${url}`;
};

export interface RequestService {
    get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
    post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
    put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
    patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
    delete: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
}

const requestService: RequestService = {
    get: async (url, config?) => {
        return axios.get(attachBaseUrl(url), config);
    },
    post: async (url, data?, config?) => {
        return axios.post(attachBaseUrl(url), data, config);
    },
    put: async (url, data?, config?) => {
        return axios.put(attachBaseUrl(url), data, config);
    },
    patch: async (url, data?, config?) => {
        return axios.patch(attachBaseUrl(url), data, config);
    },
    delete: async (url, config?) => {
        return axios.delete(attachBaseUrl(url), config);
    },
};

export default requestService;
