import React from 'react'
import { shallow } from 'enzyme'
import { RecipientForm, mapStateToProps } from './RecipientForm'

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
      currentCohort: ['kim', 'taylor', 'april', 'peter'],
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
      program: 'b',
      draggedStudent: {},
      group: []
    })
  })

  it('should set state with the cohort id', () => {
    mockEvent = { target: { value: "19"} }

    wrapper.instance().handleCohort(mockEvent)

    expect(wrapper.state()).toEqual({
      cohort_id: '19',
      program: 'b',
      draggedStudent: {},
      group: []
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
  
})