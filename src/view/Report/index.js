import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Report from './Report';
import { getListTransaction } from 'action/transaction';
import { createLoadingSelector } from 'utils/selector.helper';
import { GET_LIST_TRANSACTION } from 'action/actionTypes';
import { listLocation } from 'action/location';
import { listOutlet } from 'action/outlet';

const loadingSelector = createLoadingSelector([GET_LIST_TRANSACTION])
const mapStateToProps = (state) => ({
    isLoading: loadingSelector(state),
    token: state.auth.token,
    listTransaction: state.transaction.listTransaction.data,
    listLocation: state.location.listLocation.data,
    listOutlet: state.outlet.listOutlet.data,
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo: (path) => dispatch(push(path)),
    getListTransaction: (data, token) => dispatch(getListTransaction(data, token)),
    getListLocation: (data, token) => dispatch(listLocation(data, token)),
    getListOutlet: (data, token) => dispatch(listOutlet(data, token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Report);