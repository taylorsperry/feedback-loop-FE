import { isLoading, setCohorts, hasError } from '../actions'

export const fetchCohorts = () => {
  return async (dispatch) => {
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/cohorts"
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const cohorts = await response.json()
      dispatch(setCohorts(cohorts))
      dispatch(isLoading(false))
    } catch(error) {
      dispatch(hasError(error.message))
      dispatch(isLoading(false))
    }
  }
}