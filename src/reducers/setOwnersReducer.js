export const setOwnersReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_OWNERS':
      return action.owners
    default:
      return state
  }
}
