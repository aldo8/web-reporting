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
import { dashboardReducer } from './dashboard';
import { RESET_AUTHORIZATION } from 'action/actionTypes';


const x = combineReducers({
    router:connectRouter(history),
    loading:loadingReducer,
    auth:authReducer,
    user:userReducer,
    location:locationReducer,
    outlet:outletReducer,
    device:deviceReducer,
    transaction:transactionReducer,
    setting:settingReducer,
    dashboard:dashboardReducer
})

const appReducer = (state,action) => {
    console.log('HIYA',action)
    // when a logout action is dispatch it will reset redux state
    if(action.type === RESET_AUTHORIZATION){
        state = undefined
    }
    return x (state,action)
}
export default appReducer;