import React from 'react'
import { shallow } from 'enzyme'
import { RecipientForm, mapStateToProps, mapDispatchToProps } from './RecipientForm'
jest.mock('../../thunks/handlePost')
import { setCurrentCohort } from '../../actions'

describe('RecipientForm', () => {
  let mockState
  let wrapper
  let mockEvent

  beforeEach(() => {
    mockState = {
      survey : {name: 'name', question: 'question'},
      cohorts: [
        { id: 1 ,
        name: "1811" },
        { id: 2,
        name: "1901" }
        ],
      currentCohort: [
        {id: 1, name:'kim'}, {id: 2, name: 'taylor'}, {id: 3, name:'april'}, {id: 4, name:'peter'}
      ],
      handlePost: jest.fn(),
      setCurrentCohort: jest.fn()
    }
    wrapper = shallow(
      <RecipientForm
        survey={mockState.survey}
        cohorts={mockState.cohorts}
        currentCohort={mockState.currentCohort}
        handlePost={mockState.handlePost}
        setCurrentCohort={mockState.setCurrentCohort}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have proper default state', () => {
    expect(wrapper.state()).toEqual({
      cohort_id: 0,
      displayTeams: "none",
      program: 'both',
      draggedStudent: {},
      group: []
    })
  })

  it('should set state with the program', () => {
    mockEvent = { target: { value: 'f'} }

    wrapper.instance().handleProgram(mockEvent)

    expect(wrapper.state()).toEqual({
      cohort_id: 0,
      displayTeams: "none",
      program: 'f',
      draggedStudent: {},
      group: []
    })
  })

  it('should set state with the cohort id', () => {
    mockEvent = { target: { value: "19"} }

    wrapper.instance().handleCohort(mockEvent)

    expect(wrapper.state()).toEqual({
      cohort_id: "19",
      displayTeams: "none",
      program: 'both',
      draggedStudent: {},
      group: []
    })
  })

  it('should set state with a student when onDrag is invoked', () => {
    const mockEvent = { preventDefault: jest.fn() }
    const mockStudent = { id: 99, name: 'April' }

    wrapper.instance().onDrag(mockEvent, mockStudent)

    expect(wrapper.state('draggedStudent')).toEqual({
      id: 99,
      name: "April"
    })
  })

  it('should prevent default when student is dragged when onDragOver is invoked', () => {
    const mockEvent = { preventDefault: jest.fn() }
    wrapper.instance().onDragOver(mockEvent)
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it.skip('should update group, reset draggedStudent and call setCurrentCohort with leftover students when onDrop is invoked', () => {
    const mockEvent = { preventDefault: jest.fn() }
    const mockState = {
      group: [],
      draggedStudent: { id: 99, name: 'April'}
    }
    wrapper.setState({
      group: mockState.group,
      draggedStudent: mockState.draggedStudent
    })
  })
  
  describe('mapStateToProps', () => {
    it('should return the expected state as props', () => {
      mockState = {
        cohorts: [
          { id: 1 ,
          name: "1811" },
          { id: 2,
          name: "1901" }
          ],
        fakeState: "fakeState"
      }
      const expected = {
        cohorts: [
          { id: 1 ,
          name: "1811" },
          { id: 2,
          name: "1901" }
          ]
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return handlePost to dispatch', () => {
      const mockUrl = 'www.post.com'
        const mockOptions = {
          method: 'POST',
          body: { name: "name",
                  email: "email@gmail.com"
                },
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const mockDispatch = jest.fn()
        const handlePost = jest.fn()
        const actionToDispatch = handlePost(mockUrl, mockOptions)
        const mappedProps = mapDispatchToProps(mockDispatch)
  
        mappedProps.handlePost(mockUrl, mockOptions)
  
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return setCurrentCohort to disptch', () => {
      const mockCohort = [
        { id: 1, name: 'Kim'},
        { id: 2, name: 'Taylor'}
      ]
      const mockDispatch = jest.fn()
      const actionToDispatch = setCurrentCohort(mockCohort)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.setCurrentCohort(mockCohort)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
  
})