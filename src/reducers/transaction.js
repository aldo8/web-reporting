import { SUCCESS_TYPE, GET_LIST_TRANSACTION,DASHBOARD_LOCATION,DASHBOARD_OUTLET, LIST_LOCATION_TRANSACTION, LIST_OUTLET_TRANSACTION } from "action/actionTypes";
import { combineReducers } from "redux";

const initialStateTransaction = {
    data:{}
}
export const listTransaction = (state ={...initialStateTransaction},action) => {
    const {payload,type} = action
    switch (type) {
        case `${GET_LIST_TRANSACTION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}

export const dashboardLocation = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DASHBOARD_LOCATION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
            
    }
}
export const dashboardOutlet = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DASHBOARD_OUTLET}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
            
    }
}
export const listLocationTransaction = (state = {}, action) => {
    const {payload,type} = action
    switch (type) {
        case `${LIST_LOCATION_TRANSACTION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state
    }
}
export const listOutletTransaction = (state = {}, action) => {
    const {payload,type} = action
    switch (type) {
        case `${LIST_OUTLET_TRANSACTION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state
    }
}
const transactionReducer = combineReducers({
    listTransaction,
    dashboardLocation,
    dashboardOutlet,
    listLocationTransaction,
    listOutletTransaction

})
export {transactionReducer}