import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Lokasi from './Lokasi';
import { getLocationDetail,createLocation,deleteLocation,listLocation,updateLocation } from 'action/location';
import { createLoadingSelector } from 'utils/selector.helper';
import { CREATE_LOCATION, DELETE_LOCATION, DETAIL_LOCATION, GET_LOCATION, UPDATE_LOCATION } from 'action/actionTypes';

const loadingSelector = createLoadingSelector([CREATE_LOCATION,GET_LOCATION,UPDATE_LOCATION,DELETE_LOCATION,DETAIL_LOCATION])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    dataLocation:state.location.listLocation.data,
    token:state.auth.token,
    detailLocation:state.location.detailLocation.data,
    createLocationResponse:state.location.createLocation.response,
    updateLocatoinResponse:state.location.updateLocation.response,
    deleteLocationResponse:state.location.deleteLocation.response
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listLocation:(data,token) => dispatch(listLocation(data,token)),
    getLocationDetail:(data,token) => dispatch(getLocationDetail(data,token)),
    createLocation:(data,token) => dispatch(createLocation(data,token)),
    updateLocation:(data,token) => dispatch(updateLocation(data,token)),
    deleteLocation:(data,token) => dispatch(deleteLocation(data,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(Lokasi);