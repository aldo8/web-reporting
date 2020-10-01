import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import User from './User';
import {listUser, getUserDetail,updateUser,deleteUser,createUser, resetAuthorize} from 'action/user'
import { createLoadingSelector } from 'utils/selector.helper';
import { USER, DETAIL_USER, UPDATE_USER, DELETE_USER, CREATE_USER } from 'action/actionTypes';
import { resetAuth } from 'action/auth';

const loadingSelector = createLoadingSelector([USER,DETAIL_USER,UPDATE_USER,DELETE_USER,CREATE_USER])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    dataListUser:state.user.listUser.data,
    detailUser:state.user.detailUser.data,
    updateResponse:state.user.updateUser.response,
    userCreated:state.user.createUser,
    userDeleted:state.user.deleteUser.response,
    token:state.auth.token,
    userRole:state.auth,
    errorMessageUser:state.user.errorMessage.message,
    unAuthorize:state.user.errorMessage.unAuthorize
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listUser:(data,token) => dispatch(listUser(data,token)),
    getUserDetail:(data,token) => dispatch(getUserDetail(data,token)),
    updateUser:(data,token) => dispatch(updateUser(data,token)),
    deleteUser:(data,token) => dispatch(deleteUser(data,token)),
    createUser:(data,token) => dispatch(createUser(data,token)),
    resetAuth:() => dispatch(resetAuth()),
    resetAuthorize:() => dispatch(resetAuthorize())

})
export default connect(mapStateToProps,mapDispatchToProps)(User);