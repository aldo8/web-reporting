import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
    token:state.user.token
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path))

})
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);