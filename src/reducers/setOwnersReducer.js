export const setOwnersReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_OWNERS':
      return action.teams
    default:
      return state
  }
}
