import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class dashboardApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new dashboardApi(apiConfig(token));
        return this.api;
    }
    getDashboard = (id) => {
        return this.axios.get(`/api/v1/dashboards/${id}`)
    }
    
}