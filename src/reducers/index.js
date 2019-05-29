import { combineReducers } from 'redux'
import { isLoadingReducer } from './isLoadingReducer'
import { hasErrorReducer } from './hasErrorReducer'
import { setSurveyReducer} from './setSurveyReducer'
import { setCohortsReducer } from './setCohortsReducer'
import { setUserReducer } from './setUserReducer'
import { setRoleReducer } from './setRoleReducer'
import { setStudentSurveysReducer } from './setStudentSurveysReducer'
import { setInstructorSurveysReducer } from './setInstructorSurveysReducer'
import { setCurrentCohortReducer } from './setCurrentCohortReducer'


const rootReducer = combineReducers({
  error: hasErrorReducer,
  isLoading: isLoadingReducer,
  survey: setSurveyReducer,
  cohorts: setCohortsReducer,
  user: setUserReducer,
  currentCohort: setCurrentCohortReducer,
  role: setRoleReducer,
  studentSurveys: setStudentSurveysReducer,
  instructorSurveys: setInstructorSurveysReducer
})

export default rootReducer;
