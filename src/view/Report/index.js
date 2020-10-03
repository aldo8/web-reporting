import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Report from './Report';
import { getListTransaction,listLocationTransaction,listOutletTransaction } from 'action/transaction';
import { createLoadingSelector } from 'utils/selector.helper';
import { GET_LIST_TRANSACTION, GET_LOCATION, GET_OUTLET } from 'action/actionTypes';
import { resetAuthorize } from 'action/user';

const loadingSelector = createLoadingSelector([GET_LIST_TRANSACTION,GET_LOCATION,GET_OUTLET])
const mapStateToProps = (state) => ({
    isLoading: loadingSelector(state),
    token: state.auth.token,
    listTransaction: state.transaction.listTransaction.data,
    listLocation: state.transaction.listLocationTransaction.data,
    listOutlet: state.transaction.listOutletTransaction.data,
    unAuthorize:state.user.errorMessage.unAuthorize
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo: (path) => dispatch(push(path)),
    getListTransaction: (data, token) => dispatch(getListTransaction(data, token)),
    getListLocation: (token) => dispatch(listLocationTransaction(token)),
    getListOutlet: (token) => dispatch(listOutletTransaction(token)),
    resetAuthorize:() => dispatch(resetAuthorize())
})
export default connect(mapStateToProps, mapDispatchToProps)(Report);