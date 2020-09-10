import _ from 'lodash'

const createLoadingSelector = action => state => {
    return _(action).some(action => _.get(state,`loading.${action}`));
}
export {createLoadingSelector};
