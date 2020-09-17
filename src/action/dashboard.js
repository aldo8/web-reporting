import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_DASHBOARD} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { dashboardApi } from 'api';
import { schemaDashboard } from 'schema/dashboard';

const api = (token) => dashboardApi.newInstance(token);
export const getDashboard = (data,token) => async (dispatch) => {
    dispatch({
        type:`${GET_DASHBOARD}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).getDashboard(data);
        response = normalizeHelper(response.data,schemaDashboard);
        dispatch({
            type:`${GET_DASHBOARD}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${GET_DASHBOARD}${FAILURE_TYPE}`
        })
        
    }
}