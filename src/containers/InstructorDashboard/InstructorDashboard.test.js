import React from 'react'
import { shallow } from 'enzyme'
import { InstructorDashboard , mapStateToProps, mapDispatchToProps} from './InstructorDashboard'
import { setInstructorSurveys } from '../../actions'
jest.mock('../../thunks/handleGet')

describe('InstructorDashboard', () => {
  let wrapper
  let handleGet
  let user
  let mockSetInstructorSurveys
  let mockInstructorSurveys
  let mockDispatch

  beforeEach(() => {
    mockInstructorSurveys = [
      { id: 1, name: "Survey 1"},
      { id: 2, name: "Survey 2"}
    ]
    handleGet = jest.fn()
    mockSetInstructorSurveys = jest.fn()
    user = "2nf9rnad"
    mockDispatch = jest.fn()
    wrapper = shallow(
      <InstructorDashboard
        handleGet={handleGet}
        user={user}
        instructorSurveys={mockInstructorSurveys}
        setInstructorSurveys={mockSetInstructorSurveys}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()  
  })

  describe('mapStateToProps', () => {
    it('should return a user and instructor surveys as props', () => {
      const mockState = {
        user: "2nf9rnad",
        instructorSurveys: [
          { id: 1, name: "Survey1"},
        { id: 2, name: "Survey2"}
        ],
        fakeState: "fakeState"
      }
      const expected = {
        user: "2nf9rnad",
        instructorSurveys: [
          { id: 1, name: "Survey1"},
        { id: 2, name: "Survey2"}
        ]
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handleGet as props', () => {
      const mockUrl = 'www.getSurveys.com'
      const handleGet = jest.fn()
      const actionToDispatch = handleGet(mockUrl)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.handleGet(mockUrl)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return setInstructorSurveys as props', () => {
      const actionToDispatch = setInstructorSurveys(mockInstructorSurveys)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setInstructorSurveys(mockInstructorSurveys)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})