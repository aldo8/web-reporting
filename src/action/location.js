import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,GET_LOCATION, DETAIL_LOCATION, UPDATE_LOCATION, DELETE_LOCATION, CREATE_LOCATION} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { locationApi } from 'api';
import { schemaListLocation,schemaDetailLocation } from 'schema/location';

const api = (token) => locationApi.newInstance(token);
export const listLocation = (data,token) => async (dispatch) => {
    dispatch({
        type:`${GET_LOCATION}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).listLocation(data);
        
        response = normalizeHelper(response.data,schemaListLocation);
        dispatch({
            type:`${GET_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${GET_LOCATION}${FAILURE_TYPE}`
        })
        
    }
}

export const createLocation = (data,token) => async  (dispatch) => {
    dispatch({
        type:`${CREATE_LOCATION}${REQUEST_TYPE}`
    })
    const response = await api(data).createLocation(data)
    try {
        dispatch({
            type:`${CREATE_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${CREATE_LOCATION}${FAILURE_TYPE}`
        })
    }
}
export const getLocationDetail = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DETAIL_LOCATION}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).detailLocation(data);
        response = normalizeHelper(response.data,schemaDetailLocation);
        dispatch({
            type:`${DETAIL_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DETAIL_LOCATION}${FAILURE_TYPE}`
        })
    }
}
export const updateLocation = (data,token) => async (dispatch) => {
    dispatch({
        type:`${UPDATE_LOCATION}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).updateLocation(data)
        dispatch({
            type:`${UPDATE_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${UPDATE_LOCATION}${FAILURE_TYPE}`
        })
    }
}
export const deleteLocation = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DELETE_LOCATION}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).deleteLocation(data)
        dispatch({
            type:`${DELETE_LOCATION}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DELETE_LOCATION}${FAILURE_TYPE}`
        })
    }
}