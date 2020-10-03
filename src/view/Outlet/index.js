import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Outlet from './Outlet';
import { listOutlet,createOutlet,getOutletDetail, updateOutlet, deleteOutlet} from 'action/outlet';
import { createLoadingSelector } from 'utils/selector.helper';
import { DELETE_DEVICES, DETAIL_OUTLET, GET_OUTLET, UPDATE_DEVICES } from 'action/actionTypes';
import { listLocation } from 'action/location';
import { resetAuthorize } from 'action/user';

const loadingSelector = createLoadingSelector([GET_OUTLET,DETAIL_OUTLET,DELETE_DEVICES,UPDATE_DEVICES])
const mapStateToProps = (state) => ({
    token:state.auth.token,
    isLoading:loadingSelector(state),
    dataOutlet:state.outlet.listOutlet.data,
    dataLocation:state.location.listLocation.data,
    detailOutlet:state.outlet.detailOutlet.data,
    deleteOutletReponse:state.outlet.deleteOutlet.response,
    updateOutletReponse:state.outlet.updateOutlet.response,
    createOutletReponse:state.outlet.createOutlet.response,
    unAuthorize:state.user.errorMessage.unAuthorize
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listOutlet:(data,token) => dispatch(listOutlet(data,token)),
    createOutlet:(data,token) => dispatch(createOutlet(data,token)),
    getOutletDetail:(data,token) => dispatch(getOutletDetail(data,token)),
    updateOutlet:(data,token) => dispatch(updateOutlet(data,token)),
    deleteOutlet:(data,token) => dispatch(deleteOutlet(data,token)),
    listLocation:(data,token) => dispatch(listLocation(data,token)),
    resetAuthorize:() => dispatch(resetAuthorize())
})
export default connect(mapStateToProps,mapDispatchToProps)(Outlet);