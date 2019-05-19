import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErrorReducer } from './hasErrorReducer'

export const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
})