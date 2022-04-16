import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 *    and (conditionally) CORRECT_GUESS action.
 * @function guessWord
 * @param {string} guessedWord - Guessed word. 
 * @returns {function} - Redux Thunk function.
*/
export const guessWord = (guessedWord) => {
  return function(dispatch, getState) {

  };
}

export const getSecretWord = () => {
  // TODO: write actual action in Redux/context sections
  return axios.get('http://localhost:3030')
    .then(response => response.data);
};