import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class deviceApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new deviceApi(apiConfig(token));
        return this.api;
    }
    listDevice = (data) => {
        return this.axios.get('/api/v1/devices',data)
    }
    createDevice = (data) => {
        return this.axios.post('/api/v1/devices',data)
    }
    detailDevice = (data) => {
        return this.axios.get(`/api/v1/devices/${data}`)
    }
    updateDevice = (data) => {
        return this.axios.put(`/api/v1/devices/${data}`)
    }
    deleteDevice = (data) => {
        return this.axios.delete(`/api/v1/devices/${data}`)
    }
}