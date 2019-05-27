import React from 'react'
import { shallow } from 'enzyme'
import { StudentDashboard, mapStateToProps, mapDispatchToProps } from './StudentDashboard'
jest.mock('../../thunks/handleGet')
import { setStudentSurveys } from '../../actions'

describe('StudentDashboard', () => {
  let wrapper
  let mockUser
  let mockStudentSurveys
  let mockHandleGet
  let mockSetStudentSurveys

  beforeEach(() => {
    mockUser = '12345'
    mockStudentSurveys = [
      { id: 1, name: "Survey 1"},
      { id: 2, name: "Survey 2"}
    ]
    mockHandleGet = jest.fn()
    mockSetStudentSurveys = jest.fn()
    wrapper = shallow(
      <StudentDashboard
        user={mockUser}
        studentSurveys={mockStudentSurveys}
        handleGet={mockHandleGet}
        setStudentSurveys={mockSetStudentSurveys}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return the expected state as props', () => {
      const mockState = {
        user: '12345',
        studentSurveys: [
          { id: 1, name: "Survey 1"},
          { id: 2, name: "Survey 2"}
        ],
        fakeState: 'fakeState'
      }
      const expected = {
        user: '12345',
        studentSurveys: [
          { id: 1, name: "Survey 1"},
          { id: 2, name: "Survey 2"}
        ]
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handleGet to dispatch', () => {
      const mockUrl = 'www.getsurveys.com'
      const mockDispatch = jest.fn()
      const handleGet = jest.fn()
      const actionToDispatch = handleGet(mockUrl)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handleGet(mockUrl)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return setStudentSurveys to dispatch', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = setStudentSurveys(mockStudentSurveys)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.setStudentSurveys(mockStudentSurveys)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

  })

})