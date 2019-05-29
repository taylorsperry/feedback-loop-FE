export const setInstructorSurveysReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_INSTRUCTOR_SURVEYS':
      return action.surveys
    default: 
      return state
  }
}