import { SUCCESS_TYPE, GET_LIST_TRANSACTION, ADD_TRANSACTION } from "action/actionTypes";
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
export const addTransaction = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${ADD_TRANSACTION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}

const transactionReducer = combineReducers({
    listTransaction,
    addTransaction
})
export {transactionReducer}