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
  Profile
} from "view";
import Authorization from "components/AuthGuard";

const routes = (
  <div>
  <Switch>
    <Route exact path={MENU.DASHBOARD} component={Authorization(Dashboard)} />
    <Route exact path={MENU.LOKASI} component={Authorization(Lokasi)} />
    <Route exact path={MENU.USER} component={Authorization(User)} />
    <Route exact path={MENU.DEVICES} component={Authorization(Devices)} />
    <Route exact path={MENU.LOKASI} component={Authorization(Lokasi)} />
    <Route exact path={MENU.OUTLET} component={Authorization(Outlet)} />
    <Route exact path={MENU.SETTING} component={Authorization(Setting)} />
    <Route exact path={MENU.REPORT} component={Authorization(Report)} />
    <Route exact path={MENU.PROFILE} component={Authorization(Profile)} />
    <Route exact path={MENU.LOGIN} component={(Login)} />
    <Route exact path='*'component={Login} />
  </Switch>
  </div>
);
export default routes;
