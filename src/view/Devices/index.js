import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Devices from './Devices';
import { createDevice, deleteDevice, getDeviceDetail, listDevice, updateDevice } from 'action/device';
import { createLoadingSelector } from 'utils/selector.helper';
import { CREATE_DEVICES, DETAIL_DEVICES, GET_DEVICES, UPDATE_DEVICES } from 'action/actionTypes';

const loadingSelector = createLoadingSelector([GET_DEVICES,CREATE_DEVICES,UPDATE_DEVICES,DETAIL_DEVICES])
const mapStateToProps = (state) => ({
    token:state.auth.token,
    isLoading:loadingSelector(state),
    dataListDevice:state.device.listDevice.data,
    // detailDevice:state.device.getDeviceDetail.data
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo: (path) => dispatch(push(path)),
    getDevice: (data, token) => dispatch(listDevice(data,token)),
    createDevice: (data, token) => dispatch(createDevice(data, token)),
    getDeviceDetail: (data, token) => dispatch(getDeviceDetail(data, token)),
    updateDevice: (data, token) => dispatch(updateDevice(data, token)),
    deleteDevice: (data, token) => dispatch(deleteDevice(data, token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Devices);