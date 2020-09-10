import * as axios from 'axios'
const axiosConfig = {
    timeout:60000,
    baseURL:'http://128.199.106.232:8080',
    headers: {
        Accept:'application/json',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': '*',
    },
}
const logging = true;
const apiConfig = (token) => {
    if(token)axiosConfig.headers.Authorization = `Bearer ${token}`;
    const axiosApi = axios.create(axiosConfig);
    if(logging){
        axiosApi.interceptors.request.use(request => {
            if(process.env.NODE_ENV === 'development'){
                console.log('Starting Request',request)
            }
            return request;
        })
        axiosApi.interceptors.response.use(response => {
            if(process.env.NODE_ENV === 'development') {
                console.log('Response',response)
            }
            return response;
        })
    }
    return axiosApi;
}
export default apiConfig;
