import { SUCCESS_TYPE,GET_DASHBOARD} from "action/actionTypes";
import { combineReducers } from "redux";

export const getDashboard = (state ={},action) => {
    const {payload,type} = action
    switch (type) {
        case `${GET_DASHBOARD}${SUCCESS_TYPE}`:
            return {...state,data:payload.response}
        default:
            return state;
    }
}

const dashboardReducer = combineReducers({
    getDashboard,
})
export {dashboardReducer}