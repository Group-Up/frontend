import superagent from 'superagent';

const create = image => ({
  type: 'IMAGE_CREATE',
  payload: image,
});

const createRequest = (image, event) => (store) => {
  const { token } = store.getState();
  return superagent.post(`${API_URL}/posts/image`)
    .set('Authorization', `Bearer ${token}`)
    .attach('image', image.image)
    .field('caption', image.caption)
    .field('event', event)
    .then((response) => {
      return store.dispatch(create(response.body));
    });
};

export { createRequest }; // eslint-disable-line
