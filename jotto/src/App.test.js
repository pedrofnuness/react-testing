import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAttr, storeFactory} from '../test/testUtils';
import App from './App';


import {getSecretWord as mockGetSecretWord} from './actions';

/**
 * Setup function for App component.
 * @returns {ShallowWrapper}
 */

const setup = () => {
  const store = storeFactory();
  // Use mount, because useEffect not called on `shallow`
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  })
  test('getSecretWord on app mount', () => {
    const wrapper = setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  })
});