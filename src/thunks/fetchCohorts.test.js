import { fetchCohorts } from './fetchCohorts'
import { isLoading, setCohorts, hasError } from '../actions'

describe('fetchCohorts', () => {
  let mockUrl
  let mockDispatch
  let mockCohorts

  beforeEach(() => {
    mockUrl = "www.cohorts.com"
    mockDispatch = jest.fn()
    mockCohorts = [
      { id: 1 ,
      name: "1811" },
      { id: 2,
      name: "1901" }
      ]
  })

  it('should dispatch setCohorts if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockCohorts)
    }))

    const thunk = await fetchCohorts(mockUrl)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
    expect(mockDispatch).toHaveBeenCalledWith(setCohorts(mockCohorts))
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

})