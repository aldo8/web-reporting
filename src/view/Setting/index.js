import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Setting from './Setting';
import { detailSetting, updateSetting } from 'action/setting';
import { DETAIL_SETTING, UPDATE_SETTING } from 'action/actionTypes';
import { createLoadingSelector } from 'utils/selector.helper';

const loadingSelector = createLoadingSelector([DETAIL_SETTING,UPDATE_SETTING])
const mapStateToProps = (state) => ({
    isLoading:loadingSelector(state),
    token:state.auth.token,
    detailSetting:state.setting.detailSetting.data,
    updateSetting:state.setting.updateSetting.data  
})
const mapDispatchToProps = (dispatch) => ({
    navigateTo:(path) => dispatch(push(path)),
    getDetailSetting:(token) => dispatch(detailSetting(token)),
    updateSettingUser:(data,token) => dispatch(updateSetting(data,token))
})
export default connect(mapStateToProps,mapDispatchToProps)(Setting);