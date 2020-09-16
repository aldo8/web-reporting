import { SUCCESS_TYPE, DETAIL_SETTING, UPDATE_SETTING } from "action/actionTypes";
import { combineReducers } from "redux";

export const detailSetting = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DETAIL_SETTING}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const updateSetting = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_SETTING}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
const settingReducer = combineReducers({
    detailSetting,
    updateSetting
})
export {settingReducer}