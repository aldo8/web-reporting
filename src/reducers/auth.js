import {SUCCESS_TYPE,LOGIN, GET_USER} from 'action/actionTypes'

export default (state = {},action) => {
    const {payload,type} = action
    switch (type) {
        case `${LOGIN}${SUCCESS_TYPE}`:
        case `${GET_USER}${SUCCESS_TYPE}`:
            console.log('reducer login',payload)
            return {...state,...payload.response.data}
        default:
            return state;
    }
    
}