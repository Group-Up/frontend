import tokenReducer from '../reducers/token';

describe('Token Reducer', () => {
  const testState = {
    token: 'the token',
  };
  test('TOKEN_SET', () => {
    const action = {
      type: 'TOKEN_SET',
      payload: testState.token,
    };
    expect(tokenReducer(testState.token, action)).toEqual('the token');
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: testState.token,
    };
    expect(tokenReducer(testState.token, action)).toBeNull();
  });
  test('default IMAGE_CREATE', () => {
    const action = {
      type: 'IMAGE_CREATE',
      payload: testState.token,
    };
    expect(tokenReducer(testState.token, action)).toEqual('the token');
  });
});
