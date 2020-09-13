import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import ApplicationBar from './Appbar';
import { login } from 'action/auth';

const mapStateToProps = (state) => ({
    path:state.router.location.pathname,
    user:state.auth
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    login:(data) => dispatch(login(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationBar);