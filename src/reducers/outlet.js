import { SUCCESS_TYPE, GET_OUTLET, DETAIL_OUTLET, UPDATE_OUTLET, DELETE_OUTLET } from "action/actionTypes";
import { combineReducers } from "redux";

const initialStateOutlet = {
    data:{}
}
export const listOutlet = (state ={...initialStateOutlet},action) => {
    const {payload,type} = action
    switch (type) {
        case `${GET_OUTLET}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const detailOutlet = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DETAIL_OUTLET}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const updateOutlet = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_OUTLET}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
export const deleteOutlet = (state={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_OUTLET}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
const outletReducer = combineReducers({
    listOutlet,
    detailOutlet,
    updateOutlet,
    deleteOutlet
})
export {outletReducer}