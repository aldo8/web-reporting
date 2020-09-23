import { SUCCESS_TYPE, USER, DETAIL_USER, UPDATE_USER, DELETE_USER, CREATE_USER, FAILURE_TYPE } from "action/actionTypes";
import { combineReducers } from "redux";

const initialStateUser = {
    data:{}
}
export const listUser = (state ={...initialStateUser},action) => {
    const {payload,type} = action
    switch (type) {
        case `${USER}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const detailUser = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DETAIL_USER}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const updateUser = (state ={response:false},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_USER}${SUCCESS_TYPE}`:
            return {...state,response:true}
        case `${UPDATE_USER}${SUCCESS_TYPE}`:
            return {...state,response:false}
        default:
            return state;
    }
}
const initialStateDelete = {
    response:false
}
export const deleteUser = (state={...initialStateDelete},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_USER}${SUCCESS_TYPE}`:
            return {...state,response:true}
        default:
            return state;
    }
}
const initialCreate = {
    response:false,
    message:null
}
export const createUser = (state={...initialCreate},action) => {
    const {payload,type} = action;
    switch (type) {
        case `${CREATE_USER}${SUCCESS_TYPE}`:
            return {...state,response:true}
        case `${CREATE_USER}${FAILURE_TYPE}`:
            return {...state,message:payload.message}
        default:
            return state;
    }
}
const userReducer = combineReducers({
    listUser,
    detailUser,
    updateUser,
    deleteUser,
    createUser
})
export {userReducer}