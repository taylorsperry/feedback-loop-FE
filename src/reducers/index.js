import { combineReducers } from 'redux'
import { isLoadingReducer } from './isLoadingReducer'
import { hasErrorReducer } from './hasErrorReducer'
import { setSurveyReducer} from './setSurveyReducer'
import { setCohortsReducer } from './setCohortsReducer'
import { setUserReducer } from './setUserReducer'
import { setRoleReducer } from './setRoleReducer';

const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
  survey: setSurveyReducer,
  cohorts: setCohortsReducer,
  user: setUserReducer,
  role: setRoleReducer,
})

export default rootReducer;