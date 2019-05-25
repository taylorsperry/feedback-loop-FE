export const setCurrentCohortReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CURRENT_COHORT':
      return action.cohort
    default:
      return state
  }
}