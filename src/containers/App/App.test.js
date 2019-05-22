import React from 'react';
import { App, mapStateToProps } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  let mockBool;
  let mockError;

  beforeEach(() => {
    mockBool = false
    mockError = "Something went wrong"
    wrapper = shallow(
      <App
         isLoading={mockBool}
         error={mockError}
         fetchCohorts={jest.fn()}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
})