import { SUCCESS_TYPE, GET_LOCATION, DETAIL_LOCATION, UPDATE_LOCATION, DELETE_LOCATION, FAILURE_TYPE, CREATE_LOCATION } from "action/actionTypes";
import { combineReducers } from "redux";

const initialStateLocation = {
    data:{}
}
export const listLocation = (state ={...initialStateLocation},action) => {
    const {payload,type} = action
    switch (type) {
        case `${GET_LOCATION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const detailLocation = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DETAIL_LOCATION}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}
export const updateLocation = (state ={response:false},action) => {
    const {type} = action
    switch (type) {
        case `${UPDATE_LOCATION}${SUCCESS_TYPE}`:
            return {...state,response:true}
        case `${UPDATE_LOCATION}${FAILURE_TYPE}`:
            return {...state,response:false}
        default:
            return state;
    }
}
const initialDelete = {
    response:false
}
export const deleteLocation = (state={...initialDelete},action) => {
    const {type} = action
    switch (type) {
        case `${DELETE_LOCATION}${SUCCESS_TYPE}`:
            return {...state,response:true}
        case `${DELETE_LOCATION}${FAILURE_TYPE}`:
            return {...state,response:false}
        default:
            return state;
    }
}

const initilaStateCreateLocation = {
    response:false
}
export const createLocation = (state={...initilaStateCreateLocation},action) => {
    const {payload,type} = action
    switch (type) {
        case `${CREATE_LOCATION}${SUCCESS_TYPE}`:
            return {...state,response:payload.response} 
        case `${CREATE_LOCATION}${FAILURE_TYPE}`:
            return {...state,response:payload.response} 
        default:
            return state;
    }
}
const locationReducer = combineReducers({
    listLocation,
    detailLocation,
    updateLocation,
    deleteLocation,
    createLocation
})
export {locationReducer}