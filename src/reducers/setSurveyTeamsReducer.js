export const setSurveyTeamsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_SURVEY_TEAMS':
      return action.teams
    default:
      return state
  }
}
