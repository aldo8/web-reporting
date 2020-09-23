import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE, USER, DETAIL_USER, UPDATE_USER, DELETE_USER, CREATE_USER} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { userApi } from 'api';
import { schemaListUser } from 'schema/user';

const api = (token) => userApi.newInstance(token);
export const listUser = (data,token) => async (dispatch) => {
    dispatch({
        type:`${USER}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).listUser(data);
        response = normalizeHelper(response.data,schemaListUser);
        dispatch({
            type:`${USER}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${USER}${FAILURE_TYPE}`
        })
        
    }
}

export const createUser = (data,token) => async  (dispatch) => {
    dispatch({
        type:`${CREATE_USER}${REQUEST_TYPE}`
    })
    const response = await api(data).createUser(data)
    console.log('error Create',response)
    try {
        dispatch({
            type:`${CREATE_USER}${SUCCESS_TYPE}`,
            payload:{data:true}
        })
    } catch (error) {
        
        dispatch({
            type:`${CREATE_USER}${FAILURE_TYPE}`,
            payload:{message:error}
        })
    }
}
export const getUserDetail = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DETAIL_USER}${REQUEST_TYPE}`
    })
    try {
        let response
        response = await api(token).detailUser(data);
        response = normalizeHelper(response.data,schemaListUser);
        dispatch({
            type:`${DETAIL_USER}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DETAIL_USER}${FAILURE_TYPE}`
        })
    }
}
export const updateUser = (data,token) => async (dispatch) => {
    dispatch({
        type:`${UPDATE_USER}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).updateUser(data)
        dispatch({
            type:`${UPDATE_USER}${SUCCESS_TYPE}`,
            payload:{response:true}
        })
    } catch (error) {
        dispatch({
            type:`${UPDATE_USER}${FAILURE_TYPE}`,
            payload:{response:false}
        })
    }
}
export const deleteUser = (data,token) => async (dispatch) => {
    dispatch({
        type:`${DELETE_USER}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).deleteUser(data)
        dispatch({
            type:`${DELETE_USER}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${DELETE_USER}${FAILURE_TYPE}`
        })
    }
}