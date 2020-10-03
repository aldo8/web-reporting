import baseApi from 'api/base';
import apiConfig from 'configuration/api.config';

export default class transactionApi extends baseApi {
    static newInstance = token => {
        if(!this.api) this.api = new transactionApi(apiConfig(token));
        return this.api;
    }
    listTransaction = (params) => {
        
        return this.axios.get('/api/v1/transactions',{params})
    }
    locationTransaction = () => {
        return this.axios.get('/api/v1/transactions/locations')
    }
    outletTransaction = () => {
        return this.axios.get('/api/v1/transactions/outlets')
    }
    
}