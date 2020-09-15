import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class locationApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new locationApi(apiConfig(token));
        return this.api;
    }
    listLocation = (params) => {
        return this.axios.get('/api/v1/locations',{params})
    }
    createLocation = (params) => {
        return this.axios.post('/api/v1/locations',params)
    }
    detailLocation = (params) => {
        return this.axios.get(`/api/v1/locations/${params}`)
    }
    updateLocation = (data) => {
        return this.axios.put(`/api/v1/locations/${data.id}`,data)
    }
    deleteLocation = (id) => {
        return this.axios.delete(`/api/v1/locations/${id}`)
    }
}