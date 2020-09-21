import React from 'react';
import {ApplicationBar} from 'components';
import { ConnectedRouter } from 'connected-react-router';
import routes from 'routes';
import { history } from 'configuration/route.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Container extends React.Component{
    render(){
        return(
            <>
            <ApplicationBar/>
            <ToastContainer autoClose={3000}/>
            <ConnectedRouter history={history}>{routes}</ConnectedRouter>
            </>
        )
    }
}