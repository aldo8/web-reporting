import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Profile from './Profile';
import { createLoadingSelector } from 'utils/selector.helper';
import { DETAIL_USER, UPDATE_USER } from 'action/actionTypes';
import { resetAuthorize } from 'action/user';
import { getUserDetail,updateUser } from 'action/user';

const loadingSelector = createLoadingSelector([UPDATE_USER,DETAIL_USER])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    user:state.auth,
    profile:state.user.detailUser.data,
    updateResponse:state.user.updateUser.response,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    getUser:(id,token) => dispatch(getUserDetail(id,token)),
    updateProfile:(data,token) => dispatch(updateUser(data,token)),
    resetAuthorize:() => dispatch(resetAuthorize())
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile);