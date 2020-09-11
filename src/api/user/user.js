import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class userApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new userApi(apiConfig(token));
        return this.api;
    }
    listUser = (data) => {
        return this.axios.get('/api/v1/users',data)
    }
    createUser = (data) => {
        return this.axios.post('/api/v1/users',data)
    }
    detailUser = (data) => {
        return this.axios.get(`/api/v1/users/${data}`)
    }
    updateUser = (data) => {
        return this.axios.put(`/api/v1/users/${data}`)
    }
    deleteUser = (data) => {
        return this.axios.delete(`/api/v1/users/${data}`)
    }
}