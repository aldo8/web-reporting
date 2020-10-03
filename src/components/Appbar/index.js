import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import ApplicationBar from './Appbar';
import { login } from 'action/auth';
import { resetAuthorize } from 'action/user';

const mapStateToProps = (state) => ({
    path:state.router.location.pathname,
    user:state.auth,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    login:(data) => dispatch(login(data)),
    logout:() => dispatch(resetAuthorize())
})
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationBar);