import React from "react";
import { Route, Switch } from "react-router-dom";
import { MENU } from "constants/menu";
import {
  Login,
  Dashboard,
  User,
  Lokasi,
  Outlet,
  Devices,
  Setting,
  Report,
} from "view";

const routes = (
  <div>
  <Switch>
    <Route exact path={MENU.DASHBOARD} component={Dashboard} />
    <Route exact path={MENU.USER} component={User} />
    <Route exact path={MENU.LOKASI} component={Lokasi} />
    <Route exact path={MENU.OUTLET} component={Outlet} />
    <Route exact path={MENU.DEVICES} component={Devices} />
    <Route exact path={MENU.SETTING} component={Setting} />
    <Route exact path={MENU.REPORT} component={Report} />
    <Route exact path={MENU.LOGIN} component={Login} />
  </Switch>
  </div>
);
export default routes;
