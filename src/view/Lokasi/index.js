import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Lokasi from './Lokasi';
import { getLocationDetail,createLocation,deleteLocation,listLocation,updateLocation } from 'action/location';
import { deleteOutlet } from 'reducers/outlet';

const mapStateToProps = (state) => ({
    dataLocation:state.location.listLocation.data,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listLocation:(data,token) => dispatch(listLocation(data,token)),
    getLocationDetail:(data,token) => dispatch(getLocationDetail(data,token)),
    updateLocation:(data,token) => dispatch(updateLocation(data,token)),
    deleteLocation:(data,token) => dispatch(deleteOutlet(data,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(Lokasi);