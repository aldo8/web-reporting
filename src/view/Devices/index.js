import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Devices from './Devices';
import {getDevices} from 'action/device';
const mapStateToProps = (state) => ({
       
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    getDevices:(data,token) => dispatch(getDevices(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Devices);