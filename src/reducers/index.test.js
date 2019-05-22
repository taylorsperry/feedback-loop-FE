import rootReducer from './index'
import { createStore } from 'redux'
import { setCohortsReducer } from './setCohortsReducer'

describe('rootReducer', () => {
  it('should return a store', () => {
    const store = createStore(rootReducer)
    expect(store.getState().cohorts).toEqual(setCohortsReducer(undefined, {}))
  })
})