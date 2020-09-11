import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import User from './User';
import {getListUser,createUser,getUserById,updateUser,deleteUser} from 'action/user'

const mapStateToProps = (state) => ({
    listUser:state.user.listUser,
    detailUser:state.user.detailUser
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    listUser:(data) => dispatch(getListUser(data)),
    createUser:(data) => dispatch(createUser(data)),
    getUserDetail:(data) => dispatch(getUserById(data)),
    updateUser:(data) => dispatch(updateUser(data)),
    deleteUser:(data) => dispatch(deleteUser(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(User);