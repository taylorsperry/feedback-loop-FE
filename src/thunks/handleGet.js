import { isLoading, hasError } from '../actions'

export const handleGet = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error (response.statusText)
      }
      const surveys = await response.json()
      dispatch(isLoading(false))
      return surveys
    } catch(error) {
      dispatch(hasError(error.message))
      dispatch(isLoading(false))
    }
  }
}