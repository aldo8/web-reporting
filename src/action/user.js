import {GET_USER, SUCCESS_TYPE, FAILURE_TYPE} from 'action/actionTypes';
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