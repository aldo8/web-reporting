import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_OUTLET, DETAIL_OUTLET, UPDATE_OUTLET, DELETE_OUTLET, CREATE_OUTLET} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { outletApi } from 'api';
import { schemaListOutlet } from 'schema/outlet';

const api = (token) => outletApi.newInstance(token);
export const listOutlet = (data,token) => async (dispatch) => {
    dispatch({
        type:`${GET_OUTLET}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).listOutlet(data);
        response = normalizeHelper(response.data,schemaListOutlet);
        dispatch({
            type:`${GET_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${GET_OUTLET}${FAILURE_TYPE}`
        })
        
    }
}

export const createOutlet = (data,token) => async  (dispatch) => {
    dispatch({
        type:`${CREATE_OUTLET}${REQUEST_TYPE}`
    })
    const response = await api(data).createOutlet(data)
    try {
        dispatch({
            type:`${CREATE_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${CREATE_OUTLET}${FAILURE_TYPE}`
        })
    }
}
export const getOutletDetail = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DETAIL_OUTLET}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).detailOutlet(data);
        response = normalizeHelper(response.data,schemaListOutlet);
        dispatch({
            type:`${DETAIL_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DETAIL_OUTLET}${FAILURE_TYPE}`
        })
    }
}
export const updateOutlet = (data,token) => async (dispatch) => {
    dispatch({
        type:`${UPDATE_OUTLET}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).updateOutlet(data)
        dispatch({
            type:`${UPDATE_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${UPDATE_OUTLET}${FAILURE_TYPE}`
        })
    }
}
export const deleteOutlet = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DELETE_OUTLET}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).deleteOutlet(data)
        dispatch({
            type:`${DELETE_OUTLET}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DELETE_OUTLET}${FAILURE_TYPE}`
        })
    }
}