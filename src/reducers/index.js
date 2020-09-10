import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { history } from 'configuration/route.config';
import userReducer from './auth'
import loadingReducer from './loading'


const appReducer = combineReducers({
    router:connectRouter(history),
    user:userReducer,
    loading:loadingReducer
})
export default appReducer;