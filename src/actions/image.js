import superagent from 'superagent';
import * as routes from '../utils/routes';

const create = image => ({
  type: 'IMAGE_CREATE',
  payload: image,
});

const createRequest = image => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.IMAGES}`)
    .set('Authorization', `Bearer ${token}`)
    .field('caption', image.caption)
    .attach('image', image.image)
    .then((response) => {
      return store.dispatch(create(response.body));
    });
};

export { create, createRequest };
