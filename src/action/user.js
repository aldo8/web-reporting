import {GET_USER, SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE} from 'action/actionTypes';
import {getStorage} from 'utils/storage.helper';
export const getUser = () => dispatch => {
    dispatch({type:`${GET_USER}${REQUEST_TYPE}`});
    const user = getStorage(USER_STORAGE);
    if(user) {
        dispatch({
            type:`${GET_USER}${SUCCESS_TYPE}`,
            payload:{data:user},
        });
    } else {
        dispatch({
            type:`${GET_USER}${FAILURE_TYPE}`,
            payload:{message:null},
        });
    }  
};

export const listUser = (data,token) => dispatch => {
    dispatch({
        type:`${GET_USER}${REQUEST_TYPE}`
    })
    try {
        dispatch({
            type:`${GET_USER}${SUCCESS_TYPE}`
        })
    } catch (error) {
        type:`${GET_USER}${FAILURE_TYPE}`
    }
}
export const createUser = (data,token) => dispatch => {
    dispatch({
        type:`${CREATE_USER}${REQUEST_TYPE}`
    })
    try {
        dispatch({
            type:`${CREATE_USER}${SUCCESS_TYPE}`
        })
    } catch (error) {
        type:`${CREATE_USER}${FAILURE_TYPE}`
    }
}
export const getUserDetail = (data,token) => dispatch => {
    dispatch({
        type:`${DETAIL_USER}${REQUEST_TYPE}`
    })
    try {
        dispatch({
            type:`${DETAIL_USER}${SUCCESS_TYPE}`
        })
    } catch (error) {
        dispatch({
            type:`${DETAIL_USER}${FAILURE_TYPE}`
        })
    }
}
export const updateUser = (data,token) => dispatch => {
    dispatch({
        type:`${UPDATE_USER}${REQUEST_TYPE}`
    })
    try {
        dispatch({
            type:`${UPDATE_USER}${SUCCESS_TYPE}`
        })
    } catch (error) {
        type:`${UPDATE_USER}${FAILURE_TYPE}`
    }
}
export const deleteUser = (data,token) => dispatch => {
    dispatch({
        type:`${DELETE_USER}${REQUEST_TYPE}`
    })
    try {
        dispatch({
            type:`${DELETE_USER}${SUCCESS_TYPE}`
        })
    } catch (error) {
        type:`${DELETE_USER}${FAILURE_TYPE}`
    }
}