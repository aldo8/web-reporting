import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import ApplicationBar from './Appbar';

const mapStateToProps = (state) => ({
    path:state.router.location.pathname,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path))
})
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationBar);