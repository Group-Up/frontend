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
  test('IMAGE_CREATE', () => {
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'IMAGE_CREATE',
      payload: newpost,
    };
    expect(postReducer(testState.posts, action)).toEqual([newpost]);
  });
  test('POSTS_GET', () => {
    const testStateGet = {
      token: 'token',
      profile: {
        username: 'user',
        _id: 1,
      },
      posts: [{
        title: 'new',
        type: 'announcement',
        _id: 4,
      }],
      events: [],
    };
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'POSTS_GET',
      payload: [newpost],
    };
    expect(postReducer(testStateGet.posts, action)).toEqual([newpost]);
  });
  test('POST_REMOVE', () => {
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
    const testStateUpdate = {
      token: 'token',
      profile: {
        username: 'user',
        _id: 1,
      },
      posts: [{
        title: 'original title',
        type: 'announcement',
        _id: 4,
      }],
      events: [],
    };
    const newpost2 = {
      title: 'Edited title',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'POST_UPDATE',
      payload: newpost2,
    };
    expect(postReducer(testStateUpdate.posts, action)).toEqual([newpost2]);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'something',
    };
    expect(postReducer(testState.posts, action)).toEqual([]);
  });
  test('default: PST_GET', () => {
    const testStateDefault = {
      token: 'token',
      profile: {
        username: 'user',
        _id: 1,
      },
      posts: [],
      events: [],
    };
    const newpost = {
      title: 'new',
      type: 'announcement',
      _id: 4,
    };
    const action = {
      type: 'PST_GET',
      payload: newpost,
    };
    expect(postReducer(testStateDefault.posts, action)).toEqual([]);
  });
});
