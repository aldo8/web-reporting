import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { createBrowserHistory } from 'history';


const appReducer = combineReducers({
    router:connectRouter(createBrowserHistory)
})
export default appReducer;