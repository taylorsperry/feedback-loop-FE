export const setClosedSurveysReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CLOSED_SURVEYS':
      return action.surveys
    default:
      return state
  }
}
