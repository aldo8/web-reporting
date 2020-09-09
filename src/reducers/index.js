import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import { history } from 'configuration/route.config';


const appReducer = combineReducers({
    router:connectRouter(history)
})
export default appReducer;