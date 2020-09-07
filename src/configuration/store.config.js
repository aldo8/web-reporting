import {applyMiddleware,compose,createStore} from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from 'reducers';
import {createBrowserHistory} from 'history';

export default function storeConfig (state) {
    const middlewares = []
    if(process.env.NODE_ENV ==='development') {
        middlewares.push(logger)
    }
    const composeEnhance = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        appReducer,
        composeEnhance(
            applyMiddleware(routerMiddleware(createBrowserHistory),thunk,...middlewares)
        )
    )
    return store;
}