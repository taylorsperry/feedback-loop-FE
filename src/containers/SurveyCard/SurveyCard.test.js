import React from 'react'
import { shallow } from 'enzyme'
import { SurveyCard, mapStateToProps, mapDispatchToProps } from './SurveyCard'
import MockSurvey from './MockSurvey'
jest.mock('../../thunks/handlePost')

describe('SurveyCard', () => {
  let mockState
  let wrapper
  let mockEvent

  beforeEach(() => {
    mockState = {
      dataDisplay: "none"
    }
    wrapper = shallow(
      <SurveyCard
        surveyData={MockSurvey}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have proper default state', () => {
    expect(wrapper.state()).toEqual({
      dataDisplay: "none"
    })
  })

  it('should set toggle the data display', () => {
    wrapper.instance().toggleData()

    expect(wrapper.state()).toEqual({
      dataDisplay: "flex"
    })
  })
})
