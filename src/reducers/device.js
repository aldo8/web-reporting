import { SUCCESS_TYPE, GET_DEVICES, DETAIL_DEVICES, UPDATE_DEVICES, DELETE_DEVICES } from "action/actionTypes";
import { combineReducers } from "redux";

const initialStateDevice = {
    data:{}
}
export const listDevice = (state ={...initialStateDevice},action) => {
    const {payload,type} = action
    switch (type) {
        case `${GET_DEVICES}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const detailDevice = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DETAIL_DEVICES}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const updateDevice = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_DEVICES}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
export const deleteDevice = (state={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_DEVICES}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
const deviceReducer = combineReducers({
    listDevice,
    detailDevice,
    updateDevice,
    deleteDevice
})
export {deviceReducer}