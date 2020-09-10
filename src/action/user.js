import {FAILURE_TYPE,LOGIN,REQUEST_TYPE,SUCCESS_TYPE} from './actionTypes';
import {authApi} from 'api'
export const login = (data) => dispatch => {
    const api = authApi.newInstance();
}