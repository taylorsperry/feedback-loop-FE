import { combineReducers } from 'redux'
import { isLoadingReducer } from './isLoadingReducer'
import { hasErrorReducer } from './hasErrorReducer'
import { setSurveyReducer} from './setSurveyReducer'
import { setCohortsReducer } from './setCohortsReducer'
import { setUserReducer } from './setUserReducer'
import { setRoleReducer } from './setRoleReducer'
import { setStudentSurveysReducer } from './setStudentSurveysReducer'

const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
  survey: setSurveyReducer,
  cohorts: setCohortsReducer,
  user: setUserReducer,
  role: setRoleReducer,
  studentSurveys: setStudentSurveysReducer
})

export default rootReducer;