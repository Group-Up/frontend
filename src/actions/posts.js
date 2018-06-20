import superagent from 'superagent';

const getPosts = posts => ({
  type: 'POSTS_GET',
  payload: posts,
});

const createPost = post => ({
  type: 'POST_CREATE',
  payload: post,
});

const removePost = post => ({
  type: 'POST_REMOVE',
  payload: post,
});

const getPostsRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/posts/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getPosts(response.body));
    });
};

const getEventPosts = id => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/posts/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getPosts(response.body));
    });
};

const createPostRequest = (post, eventID) => (store) => {
  const { token } = store.getState();
  return superagent.post(`${API_URL}/posts/${eventID}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(post)
    .then((response) => {
      return store.dispatch(createPost(response.body));
    });
};

const removePostRequest = post => (store) => {
  const { token } = store.getState();
  return superagent.del(`${API_URL}/posts/${post._id}`)
    .set('Authorization', `Bearer ${token}`)
    .then(() => {
      return store.dispatch(removePost(post));
    });
};

export { getPostsRequest, getEventPosts, createPostRequest, removePostRequest };
