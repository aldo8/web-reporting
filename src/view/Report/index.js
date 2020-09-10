import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Report from './Report';

const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path))
})
export default connect(mapStateToProps,mapDispatchToProps)(Report);