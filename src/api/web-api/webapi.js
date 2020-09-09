import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class webAPI extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new webAPI(apiConfig(token));
        return this.api;
    }
    login = (data) => {
        return this.axios.post('/web/login',data)
    }
}