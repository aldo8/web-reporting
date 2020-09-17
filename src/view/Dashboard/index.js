import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Dashboard from './Dashboard';
import {dashboardLocation,dashboardOutlet} from 'action/transaction';
import {DASHBOARD_LOCATION,DASHBOARD_OUTLET, GET_DASHBOARD} from 'action/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';
import { getDashboard } from 'action/dashboard';

const loadingSelector = createLoadingSelector([DASHBOARD_LOCATION,DASHBOARD_OUTLET,GET_DASHBOARD])

const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    token:state.auth.token,
    dataDashboardLocation:state.transaction.dashboardLocation.data,
    dataDashboardOutlet:state.transaction.dashboardOutlet.data,
    dataDashboard:state.dashboard.getDashboard.data
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    dashboardLocation:(data,token) => dispatch(dashboardLocation(data,token)),
    dashboardOutlet:(data,token) => dispatch(dashboardOutlet(data,token)),
    getDashboard:(data,token) => dispatch(getDashboard(data,token))

})
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);