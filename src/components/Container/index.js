import {connect} from 'react-redux';
import Container from './Container';
import { push } from 'connected-react-router';

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch) => ({
    push:(path) => dispatch(push(path)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Container);