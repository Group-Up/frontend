import superagent from 'superagent';
import * as routes from '../utils/routes';

const setEvent = event => ({
  type: 'EVENT_SET',
  payload: event,
});

const eventCreateRequest = event => (store) => {
  const { token, profile } = store.getState();
  console.log(profile);
  return superagent.post(`${API_URL}${routes.EVENT}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...event, profile: profile._id })
    .then((response) => {
      return store.dispatch(setEvent(response.body));
    });
};

export { setEvent, eventCreateRequest };
