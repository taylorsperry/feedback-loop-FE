import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErrorReducer } from './hasErrorReducer'

const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
})

export default rootReducer;