import React from 'react'
import { shallow } from 'enzyme'
import { RecipientForm, mapStateToProps } from './RecipientForm'

describe('RecipientForm', () => {
  let mockState
  let wrapper
  let mockEvent

  beforeEach(() => {
    mockState = {
      cohorts: [
        { id: 1 ,
        name: "1811" },
        { id: 2,
        name: "1901" }
        ]
    }
    wrapper = shallow(
      <RecipientForm 
        cohorts={mockState.cohorts}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have proper default state', () => {
    expect(wrapper.state()).toEqual({
      cohort_id: 0
    })
  })

  it('should set state with the cohort id', () => {
    mockEvent = { target: { value: "19"} }

    wrapper.instance().handleChange(mockEvent)

    expect(wrapper.instance().state).toEqual({
      cohort_id: 19
    })
  })
})