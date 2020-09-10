import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class authApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new authApi(apiConfig(token));
        return this.api;
    }
    login = (data) => {
        return this.axios.post('/api/v1/auth',data)
    }
}