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
