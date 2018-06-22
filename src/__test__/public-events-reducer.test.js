import publicEventsReducer from '../reducers/public-events';

describe('Public Events Reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
    },
    posts: [],
    events: [],
    publicEvents: [],
  };
  test('EVENTS_GET_PUBLIC', () => {
    const action = {
      type: 'EVENTS_GET_PUBLIC',
      payload: testState.events,
    };
    expect(publicEventsReducer(testState.publicEvents, action)).toEqual(testState.publicEvents);
  });
  test('default', () => { 
    const action = {};
    expect(publicEventsReducer(testState.publicEvents, action)).toEqual(testState.publicEvents);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'token',
    };
    expect(publicEventsReducer(testState.publicEvents, action)).toEqual([]);
  });
});
