import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Login from './Login';
import { getUser, login } from 'action/auth';
import { LOGIN } from 'action/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';

const loadingSelector = createLoadingSelector([LOGIN])
const mapStateToProps = (state) => ({
    ...state.auth.data,
    isloading:loadingSelector(state),
})
    
    
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    login:(data) => dispatch(login(data)),
    getUser:() => dispatch(getUser())
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);