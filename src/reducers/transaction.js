import { SUCCESS_TYPE, GET_LIST_TRANSACTION, ADD_TRANSACTION,DASHBOARD_LOCATION,DASHBOARD_OUTLET } from "action/actionTypes";
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

const transactionReducer = combineReducers({
    listTransaction,
    dashboardLocation,
    dashboardOutlet

})
export {transactionReducer}