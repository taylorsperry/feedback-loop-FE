export const setRoleReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_ROLE':
      return action.role 
    default:
      return state
  }
}