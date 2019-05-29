import React from 'react'
import { shallow } from 'enzyme'
import { InstructorDashboard , mapStateToProps, mapDispatchToProps} from './InstructorDashboard'
jest.mock('../../thunks/handleGet')

describe('InstructorDashboard', () => {
  let wrapper
  let handleGet
  let user
  let mockDispatch

  beforeEach(() => {
    handleGet = jest.fn
    user = "2nf9rnad"
    mockDispatch = jest.fn()
    wrapper = shallow(
      <InstructorDashboard
        handleGet={handleGet}
        user={user}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()  
  })

  describe('mapStateToProps', () => {
    it('should return a user as props', () => {
      const mockState = {
        user: "2nf9rnad",
        fakeState: "fakeState"
      }
      const expected = {
        user: "2nf9rnad"
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handleGet as props', () => {
      const mockDispatch = jest.fn()
      const mockUrl = 'www.getSurveys.com'
      const handleGet = jest.fn()
      const actionToDispatch = handleGet(mockUrl)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.handleGet(mockUrl)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})