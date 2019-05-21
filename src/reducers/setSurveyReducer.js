export const setSurveyReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_SURVEY':
      return action.survey
    default:
      return state
  }
}