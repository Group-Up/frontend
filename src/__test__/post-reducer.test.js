import postReducer from '../reducers/posts';

describe('Post Reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
    },
    posts: [],
    events: [],
  };
  test('POST_CREATE', () => {
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'POST_CREATE',
      payload: newpost,
    };
    expect(postReducer(testState.posts, action)).toEqual([newpost]);
  });
  test('POST_GET', () => {
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    testState.posts.push(newpost);
    const action = {
      type: 'POST_GET',
      payload: newpost,
    };
    expect(postReducer(testState.posts, action)).toEqual([newpost]);
  });
  test('post_REMOVE', () => {
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    testState.posts.push(newpost);
    const action = {
      type: 'POST_REMOVE',
      payload: newpost,
    };
    expect(postReducer(testState.posts, action)).toEqual([]);
  });
  test('POST_UPDATE', () => {
    const newpost2 = {
      title: 'Edited title',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'POST_UPDATE',
      payload: newpost2,
    };
    expect(postReducer(testState.posts, action)).toEqual([newpost2, newpost2]);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'something',
    };
    expect(postReducer(testState.posts, action)).toEqual([]);
  });
});
