import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import User from './User';
import {listUser, getUserDetail,updateUser,deleteUser} from 'action/user'
import { createLoadingSelector } from 'utils/selector.helper';
import { USER, DETAIL_USER } from 'action/actionTypes';

const loadingSelector = createLoadingSelector([USER,DETAIL_USER])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    dataListUser:state.user.listUser.data,
    detailUser:state.user.detailUser.data,
    updateResponse:state.user.updateUser.data
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listUser:(data,token) => dispatch(listUser(data,token)),
    getUserDetail:(data,token) => dispatch(getUserDetail(data,token)),
    updateUser:(data,token) => dispatch(updateUser(data,token)),
    deleteUser:(data,token) => dispatch(deleteUser(data,token))
    // createUser:(data,token) => dispatch(createUser(data,token)),

})
export default connect(mapStateToProps,mapDispatchToProps)(User);