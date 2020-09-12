import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class outletApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new outletApi(apiConfig(token));
        return this.api;
    }
    listOutlet = (data) => {
        return this.axios.get('/api/v1/outlets',data)
    }
    createOutlet = (data) => {
        return this.axios.post('/api/v1/outlets',data)
    }
    detailOutlet = (data) => {
        return this.axios.get(`/api/v1/outlets/${data}`)
    }
    updateOutlet = (data) => {
        return this.axios.put(`/api/v1/outlets/${data}`)
    }
    deleteOutlet = (data) => {
        return this.axios.delete(`/api/v1/outlets/${data}`)
    }
}