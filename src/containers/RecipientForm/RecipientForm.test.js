import React from 'react'
import { shallow } from 'enzyme'
import { RecipientForm, mapStateToProps, mapDispatchToProps } from './RecipientForm'
import { setCurrentCohort } from '../../actions'
jest.mock('../../thunks/handlePost')
jest.mock('../../thunks/handleGet')

describe('RecipientForm', () => {
  let mockState
  let wrapper
  let mockEvent
  let mockHistory = { push: jest.fn() }

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
      handleGet: jest.fn(),
      setCurrentCohort: jest.fn()
    }
    wrapper = shallow(
      <RecipientForm
        survey={mockState.survey}
        cohorts={mockState.cohorts}
        currentCohort={mockState.currentCohort}
        handleGet={mockState.handleGet}
        handlePost={mockState.handlePost}
        setCurrentCohort={mockState.setCurrentCohort}
        history={mockHistory}
      />
    )
  })

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have proper default state', () => {
    expect(wrapper.state('cohort_id')).toEqual(0)
    expect(wrapper.state('program')).toBe('both')
    expect(wrapper.state('draggedStudent')).toEqual({})
    expect(wrapper.state('group')).toEqual([])
    expect(wrapper.state('teams')).toHaveLength(1)
  })

  it('should set state with the program', () => {
    mockEvent = { target: { value: 'f'} }
    wrapper.instance().handleProgram(mockEvent)
    expect(wrapper.state('program')).toEqual('f')
  })

  it('should set state with the cohort id', () => {
    mockEvent = { target: { value: "19"} }
    wrapper.instance().handleCohort(mockEvent)
    expect(wrapper.state('cohort_id')).toEqual('19')
  })

  it('should dispatch handleGet when handleAssignGroups is called', async () => {
    wrapper.instance().handleAssignGroups()
    expect(wrapper.instance().props.handleGet).toHaveBeenCalled()
  })

  it('should dispatch setCurrentCohort when handleAssignGroups is called', async () => {
    wrapper.instance().handleAssignGroups()
    const expected = await wrapper.instance().props.handleGet()
    expect(wrapper.instance().props.setCurrentCohort).toHaveBeenCalledWith(expected)
  })

  it('should push to dashboard when handleSuccess is called', () => {
    wrapper.instance().handleSuccess()
    expect(wrapper.instance().props.history.push).toHaveBeenCalled()
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

  it('should update teams and call setCurrentCohort with leftover students when onDrop is invoked', () => {
    const mockEvent = { preventDefault: jest.fn(), target: {id: 17} }
    const mockState = {
      teams: [{ id: 17, name: 'team one', members: []}],
      draggedStudent: { id: 99, name: 'April'}
    }
    const expected = {
      teams: [{ id: 17, name: 'team one', members: [ {id: 99, name: 'April' }]}],
      draggedStudent: {}
    }
    wrapper.setState({
      teams: mockState.teams,
      draggedStudent: mockState.draggedStudent
    })
    wrapper.instance().onDrop(mockEvent)
    expect(wrapper.state('teams')).toEqual(expected.teams)
    expect(wrapper.instance().props.setCurrentCohort).toHaveBeenCalled()
  })

  it('should add a team to state when addTeam is called', () => {
    wrapper.setState({
      teams: [{id: 7, name: 'team one', members: []}]
    })
    wrapper.instance().addTeam()
    expect(wrapper.state('teams')).toHaveLength(2)
  })
  
  it('should update a team in state when handleTeamName is called', () => {
    const mockState = {
      teams: [{ id: 17, name: 'team one', members: [ {id: 99, name: 'April' }]}]
    }
    const mockTeam = { id: 17, name: 'new name' }
    const expected = [{ id: 17, name: 'new name', members: [ {id: 99, name: 'April' }]}]
    wrapper.setState(mockState)
    wrapper.instance().handleTeamName(mockTeam.id, mockTeam.name)
    expect(wrapper.state('teams')).toEqual(expected)
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

    it('should return setCurrentCohort to dispatch', () => {
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