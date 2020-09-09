import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Login from './Login';
import { login } from 'action/user';

const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    login:(data) => dispatch(login(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);