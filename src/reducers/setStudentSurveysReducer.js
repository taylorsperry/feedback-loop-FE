export const setStudentSurveysReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_STUDENT_SURVEYS':
      return action.surveys
    default:
      return state
  }
}