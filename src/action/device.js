import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_DEVICES, DETAIL_DEVICES, UPDATE_DEVICES, DELETE_DEVICES, CREATE_DEVICES} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { deviceApi } from 'api';
import { schemaListDevice,schemaDetailDevice } from 'schema/device';

const api = (token) => deviceApi.newInstance(token);
export const listDevice = (data,token) => async (dispatch) => {
    dispatch({
        type:`${GET_DEVICES}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).listDevice(data);
        response = normalizeHelper(response.data,schemaListDevice);
        dispatch({
            type:`${GET_DEVICES}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${GET_DEVICES}${FAILURE_TYPE}`
        })
        
    }
}

export const createDevice = (data,token) => async  (dispatch) => {
    dispatch({
        type:`${CREATE_DEVICES}${REQUEST_TYPE}`
    })
    await api(data).createDevice(data)
    try {
        dispatch({
            type:`${CREATE_DEVICES}${SUCCESS_TYPE}`,
            payload:{response:true}
        })
    } catch (error) {
        dispatch({
            type:`${CREATE_DEVICES}${FAILURE_TYPE}`,
            payload:{response:false}
        })
    }
}
export const getDeviceDetail = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DETAIL_DEVICES}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).detailDevice(data);
        response = normalizeHelper(response.data,schemaDetailDevice);
        dispatch({
            type:`${DETAIL_DEVICES}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DETAIL_DEVICES}${FAILURE_TYPE}`
        })
    }
}
export const updateDevice = (data,token) => async (dispatch) => {
    dispatch({
        type:`${UPDATE_DEVICES}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).updateDevice(data)
        dispatch({
            type:`${UPDATE_DEVICES}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${UPDATE_DEVICES}${FAILURE_TYPE}`
        })
    }
}
export const deleteDevice = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DELETE_DEVICES}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).deleteDevice(data)
        dispatch({
            type:`${DELETE_DEVICES}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DELETE_DEVICES}${FAILURE_TYPE}`
        })
    }
}