import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { history } from 'configuration/route.config';
import userReducer from './auth'


const appReducer = combineReducers({
    router:connectRouter(history),
    user:userReducer
})
export default appReducer;