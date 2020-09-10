import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Setting from './Setting';

const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path))
})
export default connect(mapStateToProps,mapDispatchToProps)(Setting);