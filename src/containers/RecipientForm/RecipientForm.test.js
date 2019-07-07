import React from 'react'
import { shallow } from 'enzyme'
import { RecipientForm, mapStateToProps, mapDispatchToProps } from './RecipientForm'
import { setCurrentCohort, setInstructorSurveys, setSurveyTeams } from '../../actions'
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
      setCurrentCohort: jest.fn(),
      setInstructorSurveys: jest.fn(),
      setSurveyTeams: jest.fn()
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
        setInstructorSurveys={mockState.setInstructorSurveys}
        setSurveyTeams={mockState.setSurveyTeams}
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

  it('should dispatch setSurveyTeams when validateGroups is called', async () => {
    const formattedGroups = [{ name: 'team name', members_ids: [99, 4]}];
    wrapper.instance().validateGroups(formattedGroups)
    expect(wrapper.instance().props.setSurveyTeams).toHaveBeenCalled()
  })

  it('should NOT dispatch setSurveyTeams when formatGroups is called with only one team member', async () => {
    const formattedGroups = [{ name: 'team name', members_ids: [99]}];
    const mockState = {
      teams: [{ id: 17, name: 'team one', members: [ {id: 99, name: 'April' }]}]
    }
    wrapper.setState(mockState)
    wrapper.instance().formatGroups()
    expect(wrapper.instance().props.setSurveyTeams).not.toHaveBeenCalled()
  })

  it.skip('should push to dashboard when handleSuccess is called', async () => {
    wrapper.instance().handleSuccess()
    await wrapper.instance().props.handleGet()
    expect(wrapper.instance().props.setInstructorSurveys).toHaveBeenCalled()
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

  it('should call checkTeamNames when checkSurvey is called', () => {
    const checkTeamNamesSpy = jest.spyOn(wrapper.instance(), 'checkTeamNames')
    wrapper.instance().checkSurvey()
    expect(checkTeamNamesSpy).toHaveBeenCalled()
  })

  it('should call formatGroups when checkTeamNames is called', () => {
    const formatGroupsSpy = jest.spyOn(wrapper.instance(), 'formatGroups')
    const mockState = {
      teams: [{ id: 17, name: 'team one', members: [ {id: 99, name: 'April' }]}]
    }
    wrapper.setState({
      teams: mockState.teams
    })
    wrapper.instance().checkTeamNames()
    expect(formatGroupsSpy).toHaveBeenCalled()
  })

  it('should not call validateGroups if a team is missing a name', async () => {
    const validateGroupsSpy = jest.spyOn(wrapper.instance(), 'validateGroups')
    const mockState = {
      teams: [{ id: 17, name: '', members: [ {id: 99, name: 'April' }]}]
    }
    wrapper.setState({
      teams: mockState.teams
    })
    await wrapper.instance().checkTeamNames()
    await expect(validateGroupsSpy).not.toHaveBeenCalled()
  })

  it('formatGroups should call validateGroups with formattedGroups', async () => {
    const validateGroupsSpy = jest.spyOn(wrapper.instance(), 'validateGroups')
    const mockState = {
      teams: [{ id: 17, name: 'team name', members: [ {id: 99, name: 'April' }, {id: 4, name: 'Taylor'}]}]
    }
    const formattedGroups = [{ name: 'team name', members_ids: [99, 4]}]
    await wrapper.setState({
      teams: mockState.teams
    })
    await wrapper.instance().formatGroups()
    await expect(validateGroupsSpy).toHaveBeenCalledWith(formattedGroups)
  })

  it('should not call setSurveyTeams if a team does not have at least two members', () => {
    const setSurveyTeamsSpy = jest.spyOn(wrapper.instance().props, 'setSurveyTeams')
    const mockState = {
      teams: [{ id: 17, name: 'team name', members: [ {id: 99, name: 'April' }]}]
    }
    const formattedGroups = [{ name: 'team name', members_ids: [99]}]
    wrapper.setState({
      teams: mockState.teams
    })
    wrapper.instance().formatGroups()
    expect(setSurveyTeamsSpy).not.toHaveBeenCalledWith(formattedGroups)
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

    it('should return handleGet to dispatch', () => {
      const mockUrl = 'www.post.com'

      const mockDispatch = jest.fn()
      const handleGet = jest.fn()
      const actionToDispatch = handleGet(mockUrl)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handleGet(mockUrl)

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
