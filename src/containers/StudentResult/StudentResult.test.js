import React from 'react'
import { shallow } from 'enzyme'
import { StudentResult, mapStateToProps, mapDispatchToProps } from './StudentResult'
import MockSurvey from '../../utils/MockSurvey'
jest.mock('../../thunks/handleGet')

describe('StudentResult', () => {
  let mockState
  let wrapper
  let mockEvent
  let mockFn = jest.fn()

  beforeEach(() => {
    mockState = {
      studentResult: null,
      classResult: null,
      dataDisplay: "none"
    }
    wrapper = shallow(
      <StudentResult
        survey={MockSurvey}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have proper default state', () => {
    expect(wrapper.state()).toEqual({
      studentResult: null,
      classResult: null,
      dataDisplay: "none"
    })
  })

  it('should set toggle the data display', () => {
    wrapper.instance().toggleData()

    expect(wrapper.state()).toEqual({
      studentResult: null,
      classResult: null,
      dataDisplay: "flex"
    })
  })

})
