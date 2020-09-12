import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { history } from 'configuration/route.config';
import authReducer from './auth';
import {userReducer} from './user';
import loadingReducer from './loading';
import { outletReducer } from './outlet';
import { locationReducer } from './location';


const appReducer = combineReducers({
    router:connectRouter(history),
    auth:authReducer,
    user:userReducer,
    outlet:outletReducer,
    location:locationReducer,
    loading:loadingReducer
})
export default appReducer;