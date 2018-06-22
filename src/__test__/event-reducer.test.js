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
  test('EVENT_SET', () => {
    const newevent = {
      title: 'new',
      description: 'another event',
      posts: [],
      _id: 2,
    };
    const action = {
      type: 'EVENT_SET',
      payload: newevent,
    };
    expect(eventReducer(testState.events, action)).toEqual([newevent]);
  });
  test('EVENT_GET', () => {
    const action = {
      type: 'EVENT_GET',
      payload: testState.events,
    };
    expect(eventReducer(testState.events, action)).toEqual(testState.events);
  });
  test('EVENT_REMOVE', () => {
    const newevent = {
      title: 'new',
      description: 'another event',
      posts: [],
      _id: 2,
    };
    testState.events.push(newevent);
    const action = {
      type: 'EVENT_REMOVE',
      payload: newevent,
    };
    expect(eventReducer(testState.events, action)).toEqual([]);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'token',
    };
    expect(eventReducer(testState.events, action)).toEqual([]);
  });
});
