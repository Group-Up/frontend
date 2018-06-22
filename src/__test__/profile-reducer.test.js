import profileReducer from '../reducers/profile';

describe('profile reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
      email: 'user@user.user',
      bio: 'user bio',
    },
    events: [],
    posts: [],
  };
  test('default: CLIENT_SET', () => {
    const action = {
      type: 'CLIENT_SET',
      payload: testState.profile,
    };
    expect(profileReducer(testState.profile, action)).toEqual(testState.profile);
  });
  test('CLIENT_PROFILE_SET', () => {
    const action = {
      type: 'CLIENT_PROFILE_SET',
      payload: testState.profile,
    };
    expect(profileReducer(testState.profile, action)).toEqual(testState.profile);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: testState.profile,
    };
    expect(profileReducer(testState, action)).toBeNull();
  });
});
