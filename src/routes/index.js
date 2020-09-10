import React from 'react';
import {Route,Switch} from 'react-router';
import {MENU} from 'constants/menu'
import Dashboard from 'view/Dashboard/Dashboard';
import {Login} from 'view';

const routes = (
    <Switch>
        <Route exact path={MENU.DASHBOARD} component={Dashboard}/>
        <Route exact path={MENU.LOGIN} component={Login}/>
    </Switch>
)
export default routes