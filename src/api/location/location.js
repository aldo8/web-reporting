import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class locationApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new locationApi(apiConfig(token));
        return this.api;
    }
    listLocation = (data) => {
        return this.axios.get('/api/v1/locations',data)
    }
    createLocation = (data) => {
        return this.axios.post('/api/v1/locations',data)
    }
    detailLocation = (data) => {
        return this.axios.get(`/api/v1/locations/${data}`)
    }
    updateLocation = (data) => {
        return this.axios.put(`/api/v1/locations/${data}`)
    }
    deleteLocation = (data) => {
        return this.axios.delete(`/api/v1/locations/${data}`)
    }
}