import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class settingApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new settingApi(apiConfig(token));
        return this.api;
    }
    detailSetting = () => {
        return this.axios.get('/api/v1/settings')
    }
    updateSetting = (data) => {
        return this.axios.put(`/api/v1/settings`,data)
    }
}