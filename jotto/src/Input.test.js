import React from "react";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import Input from "./Input";

/**
 * Setup function for input component
 * @returns {ShallowWrapper}
 */

const defaultProps = { secretWord: "file" };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  const expectedProps = { secretWord: "file" };
  checkProps(Input, expectedProps);
});

describe("state controlled input field", () => {
  test("state updates with value of input box upon change", () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
});
