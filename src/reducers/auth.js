import { SUCCESS_TYPE, LOGIN, GET_USER, RESET_AUTH } from 'action/actionTypes'

export default (state = {}, action) => {
    const { payload, type } = action
    switch (type) {
        case `${LOGIN}${SUCCESS_TYPE}`:
            return { ...state, ...payload.data}
        case `${GET_USER}${SUCCESS_TYPE}`:
            return { ...state, ...payload.data}
        case `${RESET_AUTH}${SUCCESS_TYPE}`:
            return {}
        default:
            return state;
    }

}