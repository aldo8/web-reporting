import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Report from './Report';
import { addTransaction, getListTransaction } from 'action/transaction';
import { createLoadingSelector } from 'utils/selector.helper';
import { ADD_TRANSACTION, GET_LIST_TRANSACTION } from 'action/actionTypes';

const loadingSelector = createLoadingSelector([GET_LIST_TRANSACTION,ADD_TRANSACTION])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    token:state.auth.token,
    listTransaction:state.transaction.listTransaction.data  
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    getListTransaction:(data,token) => dispatch(getListTransaction(data,token)),
    addTransaction:(data,token) => dispatch(addTransaction(data,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(Report);