import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { hasErrorReducer } from './hasErrorReducer'
import { setSurveyReducer} from './setSurveyReducer'

const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
  survey: setSurveyReducer
})

export default rootReducer;