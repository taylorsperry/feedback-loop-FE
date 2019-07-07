export const setMySurveyReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_MY_SURVEY':
      return action.survey
    default:
      return state
  }
}
