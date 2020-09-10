import {authApi} from 'api'
import {REQUEST_TYPE,FAILURE_TYPE,LOGIN,SUCCESS_TYPE} from './actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { schemaAuth } from 'schema/auth';

const api = (token) => authApi.newInstance(token);
export const login = (data,token) => async (dispatch) => {
    console.log('Hai')
    dispatch({
        type:`${LOGIN}${REQUEST_TYPE}`
    });
    try {
        let response

        response = await api(token).login(data);
        response = normalizeHelper(response.data,schemaAuth);
        dispatch({
            type:`${LOGIN}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('errorLogin:',error)
        dispatch({
            type:`${LOGIN}${FAILURE_TYPE}`
        })
    }
}