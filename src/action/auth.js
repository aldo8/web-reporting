import {authApi} from 'api'
import {REQUEST_TYPE,FAILURE_TYPE,LOGIN,SUCCESS_TYPE, GET_USER} from './actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { schemaAuth } from 'schema/auth';
import { setStorage, getStorage } from 'utils/storage.helper';
import { USER_STORAGE } from 'constants/storage';

const api = (token) => authApi.newInstance(token);
export const login = (data,token) => async (dispatch) => {
    dispatch({
        type:`${LOGIN}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).login(data);
        response = normalizeHelper(response.data,schemaAuth);
        console.log('data payload:',response.data)
        setStorage(USER_STORAGE,response.data)
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

export const getUser = () => dispatch => {
    dispatch({
        type:`${GET_USER}${REQUEST_TYPE}`
    })
        const user = getStorage(USER_STORAGE);
        if(user) {
            dispatch({
                type:`${GET_USER}${SUCCESS_TYPE}`,
                payload:{data:user}
            })
        } else {
            dispatch({
                type:`${GET_USER}${FAILURE_TYPE}`,
                payload:{message:null},
            })
        }
}
