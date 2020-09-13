import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_LIST_TRANSACTION, ADD_TRANSACTION} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { transactionApi } from 'api';
import { schemaListTransaction,schemaAddTransaction } from 'schema/transaction';

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
export const addTransaction = (data,token) => async (dispatch) => {
    dispatch({
        type:`${ADD_TRANSACTION}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).addTransaction(data)
        response = normalizeHelper(response.data,schemaAddTransaction)
        dispatch({
            type:`${ADD_TRANSACTION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${ADD_TRANSACTION}${FAILURE_TYPE}`
        })
    }
}