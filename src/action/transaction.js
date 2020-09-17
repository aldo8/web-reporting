import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_LIST_TRANSACTION, DASHBOARD_LOCATION,DASHBOARD_OUTLET} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { transactionApi } from 'api';
import { schemaListTransaction, schemaLocationTransaction, schemaOutletTransaction } from 'schema/transaction';

const api = (token) => transactionApi.newInstance(token);
export const getListTransaction = (data,token) => async (dispatch) => {
    dispatch({
        type:`${GET_LIST_TRANSACTION}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).listTransaction(data)
        response = normalizeHelper(response.data,schemaListTransaction)
        dispatch({
            type:`${GET_LIST_TRANSACTION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${GET_LIST_TRANSACTION}${FAILURE_TYPE}`
        })
    }
}
export const dashboardLocation = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DASHBOARD_LOCATION}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).locationTransaction(data)
        response = normalizeHelper(response.data,schemaLocationTransaction)
        dispatch({
            type:`${DASHBOARD_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DASHBOARD_LOCATION}${FAILURE_TYPE}`
        })
    }
}

export const dashboardOutlet = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DASHBOARD_OUTLET}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).outletcTransaction(data)
        response = normalizeHelper(response.data,schemaOutletTransaction)
        dispatch({
            type:`${DASHBOARD_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DASHBOARD_OUTLET}${FAILURE_TYPE}`
        })
    }
}