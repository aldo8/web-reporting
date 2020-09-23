import { SUCCESS_TYPE, GET_OUTLET, DETAIL_OUTLET, UPDATE_OUTLET, DELETE_OUTLET, FAILURE_TYPE, CREATE_OUTLET } from "action/actionTypes";
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

const initialUpdate = {
    response:false
}
export const updateOutlet = (state ={...initialUpdate},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_OUTLET}${SUCCESS_TYPE}`:
            return {...state,response:payload.response}
        case `${UPDATE_OUTLET}${FAILURE_TYPE}`:
            return {...state,response:payload.response}
        default:
            return state;
    }
}

const initialDelete ={
    response:false
}
export const deleteOutlet = (state={...initialDelete},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_OUTLET}${SUCCESS_TYPE}`:
            return {...state,response:payload.response}
        case `${DELETE_OUTLET}${FAILURE_TYPE}`:
            return {...state,response:payload.response}
        default:
            return state;
    }
}
const initialCreate = {
    response:false
}
export const createOutlet = (state={...initialCreate},action) => {
    const {payload,type} = action
    switch (type) {
        case `${CREATE_OUTLET}${SUCCESS_TYPE}`:
            return {...state,response:payload.response}
        case `${CREATE_OUTLET}${FAILURE_TYPE}`:
            return {...state,response:payload.response}
        default:
            return state;
    }
}
const outletReducer = combineReducers({
    listOutlet,
    detailOutlet,
    updateOutlet,
    deleteOutlet,
    createOutlet
})
export {outletReducer}