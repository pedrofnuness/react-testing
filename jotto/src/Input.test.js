import React from "react";
import { mount } from "enzyme";
import { checkProps, findByTestAttr, storeFactory } from "../test/testUtils";
import { Provider } from 'react-redux';

import Input from "./Input";

/**
 * Setup function for input component
 * @returns {ShallowWrapper}
**/


const setup = (initialState={}, secretWord='party') => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input secretWord={secretWord} />
    </Provider>
  );
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper; 
    beforeEach(() => {
      wrapper = setup({ success: true });
    })

    test("renders without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test('input box does not displays', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not displays', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });
  describe('success is false', () => {
    let wrapper; 
    beforeEach(() => {
      wrapper = setup({ success: false });
    });
    test("renders without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test('input box displays', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button displays', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
})

test("does not throw warning with expected props", () => {
  const expectedProps = { secretWord: "file" };
  checkProps(Input, expectedProps);
});
 
describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState; 

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({ success: false });
  });
  afterEach(() => {
    React.useState = originalUseState;
  });

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test("field is cleared upon submit button click", () => {
    const button = findByTestAttr(wrapper, 'submit-button');

    button.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  }) 
});
