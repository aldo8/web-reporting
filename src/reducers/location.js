import { SUCCESS_TYPE, GET_LOCATION, DETAIL_LOCATION, UPDATE_LOCATION, DELETE_LOCATION } from "action/actionTypes";
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
export const updateLocation = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_LOCATION}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
export const deleteLocation = (state={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_LOCATION}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
const locationReducer = combineReducers({
    listLocation,
    detailLocation,
    updateLocation,
    deleteLocation
})
export {locationReducer}