import {FAILURE_TYPE,REQUEST_TYPE,SUCCESS_TYPE,LOGIN} from 'action/actionTypes'

export default (state = {},action) => {
    const {payload,type} = action
    switch (type) {
        case `${LOGIN}${SUCCESS_TYPE}`:
            return {data:payload.response.data}
        default:
            return state;
    }
}