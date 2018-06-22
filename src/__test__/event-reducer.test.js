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
  test('EVENTS_GET', () => {
    const action = {
      type: 'EVENTS_GET',
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
  test('EVENT_UPDATE', () => {
    const testStateToUpdate = {
      token: 'token',
      profile: {
        username: 'user',
        _id: 1,
      },
      posts: [],
      events: [{
        title: 'original',
        description: 'original desc',
        posts: [],
        id: 1,
      }],
    };
    const updatedEvent = {
      title: 'updated',
      description: 'updated desc',
      posts: [],
      id: 1,
    };
    const action = {
      type: 'EVENT_UPDATE',
      payload: updatedEvent,
    };
    expect(eventReducer(testStateToUpdate.events, action)).toEqual([updatedEvent]);
  });
  test('IMAGE_CREATE - should return state as passed', () => {
    const action = {
      type: 'IMAGE_CREATE',
      payload: 'IMAGE',
    };
    expect(eventReducer(testState.events, action)).toEqual(testState.events);
  });
});
