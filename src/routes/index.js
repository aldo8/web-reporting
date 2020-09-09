import React from 'react';
import {Route,Switch} from 'react-router';
import {MENU} from 'constants/menu'
import Dashboard from 'view/Dashboard/Dashboard';

const routes = (
    <Switch>
        <Route exact path={MENU.DASHBOARD} component={Dashboard}/>
    </Switch>
)
export default routes