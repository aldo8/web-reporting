import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Outlet from './Outlet';
import { listOutlet,createOutlet,getOutletDetail, updateOutlet, deleteOutlet} from 'action/outlet';
import { createLoadingSelector } from 'utils/selector.helper';
import { DETAIL_OUTLET, GET_OUTLET } from 'action/actionTypes';
import { listLocation } from 'action/location';

const loadingSelector = createLoadingSelector([GET_OUTLET,DETAIL_OUTLET])
const mapStateToProps = (state) => ({
    token:state.auth.token,
    isLoading:loadingSelector(state),
    dataOutlet:state.outlet.listOutlet.data,
    dataLocation:state.location.listLocation.data,
    detailOutlet:state.outlet.detailOutlet.data,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listOutlet:(data,token) => dispatch(listOutlet(data,token)),
    createOutlet:(data,token) => dispatch(createOutlet(data,token)),
    getOutletDetail:(data,token) => dispatch(getOutletDetail(data,token)),
    updateOutlet:(data,token) => dispatch(updateOutlet(data,token)),
    deleteOutlet:(data,token) => dispatch(deleteOutlet(data,token)),
    listLocation:(data,token) => dispatch(listLocation(data,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(Outlet);