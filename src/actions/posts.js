import superagent from 'superagent';

const getPosts = posts => ({
  type: 'POSTS_GET',
  payload: posts,
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

export { getPostsRequest };
