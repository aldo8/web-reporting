import {SUCCESS_TYPE, FAILURE_TYPE, REQUEST_TYPE,DETAIL_SETTING,UPDATE_SETTING} from 'action/actionTypes';
import normalizeHelper from 'utils/normalize.helper';
import { settingApi } from 'api';
import { schemaSetting } from 'schema/setting';

const api = (token) => settingApi.newInstance(token);
export const detailSetting = (token) => async (dispatch) => {
    dispatch({
        type:`${DETAIL_SETTING}${REQUEST_TYPE}`
    });
    try {
        let response
        response = await api(token).detailSetting();
        console.log('response Detail',response)
        response = normalizeHelper(response.data,schemaSetting);
        dispatch({
            type:`${DETAIL_SETTING}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        console.log('error request:',error)
        dispatch({
            type:`${DETAIL_SETTING}${FAILURE_TYPE}`
        })
        
    }
}

export const updateSetting = (data,token) => async (dispatch) => {
    dispatch({
        type:`${UPDATE_SETTING}${REQUEST_TYPE}`
    })
    try {
        const response = await api(token).updateSetting(data)
        dispatch({
            type:`${UPDATE_SETTING}${SUCCESS_TYPE}`,
            payload:{response}
        })
    } catch (error) {
        dispatch({
            type:`${UPDATE_SETTING}${FAILURE_TYPE}`
        })
    }
}