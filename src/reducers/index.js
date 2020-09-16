import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { history } from 'configuration/route.config';
import authReducer from './auth';
import {userReducer} from './user';
import loadingReducer from './loading';
import { outletReducer } from './outlet';
import { locationReducer } from './location';
import { transactionReducer } from './transaction';
import { deviceReducer } from './device';
import { settingReducer } from './setting';


const appReducer = combineReducers({
    router:connectRouter(history),
    loading:loadingReducer,
    auth:authReducer,
    user:userReducer,
    location:locationReducer,
    outlet:outletReducer,
    device:deviceReducer,
    transaction:transactionReducer,
    setting:settingReducer
    
})
export default appReducer;