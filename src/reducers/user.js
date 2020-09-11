import { SUCCESS_TYPE, USER, DETAIL_USER, UPDATE_USER, DELETE_USER } from "action/actionTypes";
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
export const updateUser = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${UPDATE_USER}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
export const deleteUser = (state={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${DELETE_USER}${SUCCESS_TYPE}`:
            return {...state,...payload.response}
        default:
            return state;
    }
}
const userReducer = combineReducers({
    listUser,
    detailUser,
    updateUser,
    deleteUser
})
export {userReducer}