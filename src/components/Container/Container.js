import React from 'react';
import {ApplicationBar} from 'components';
import { ConnectedRouter } from 'connected-react-router';
import routes from 'routes';
import { history } from 'configuration/route.config';

export default class Container extends React.Component{
    render(){
        return(
            <>
            <ApplicationBar/>
            <ConnectedRouter history={history}>{routes}</ConnectedRouter>
            </>
        )
    }
}