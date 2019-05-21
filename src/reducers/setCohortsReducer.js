export const setCohortsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_COHORTS':
      return action.cohorts 
    default:
      return state
  }
}