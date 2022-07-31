import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { findByTestAttr, storeFactory } from '../test/testUtils.js';

// Activate global mock to make sure getSecretWord doesn't make network calls
jest.mock('./actions');

/**
 * Create wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 * @function
 * 
 * @param {object} state - Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component.
 */

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(<Provider store={store}> <App /> </Provider>);

  // add value to input inputBox
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  // simulate click on submit button
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

describe('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party', 
      success: false,
      guessedWords: []
    });
  });

  test('creates GuessedWords table with one row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsRows).toHaveLength(1);
  });
});

describe('some words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1}]
    })
  });

  test('adds rows to GuessedWords table', () => {
    const guessedWordsRows = findByTestAttr(wrapper);
    expect(guessedWordsRows).toHaveLength(2);
  })
});

describe('guess secret word', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1}]
    });
    
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = {target: { value: 'party' }};
    inputBox.simulate('change', mockEvent);

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {}});
  });

  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordNodes).toHaveLength(3);
  });

  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  })
})
