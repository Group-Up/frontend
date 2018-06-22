import eventReducer from '../reducers/event';

describe('Event Reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
    },
    posts: [],
    events: [],
  };
  test('GET_SINGLE_EVENT', () => {
    const action = {
      type: 'GET_SINGLE_EVENT',
      payload: testState.events,
    };
    expect(eventReducer(testState.events, action)).toEqual(testState.events);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'token',
    };
    expect(eventReducer(testState.events, action)).toEqual([]);
  });
});
