import superagent from 'superagent';
import * as routes from '../utils/routes';

const getPrivateEvents = events => ({
  type: 'EVENTS_GET',
  payload: events,
});

const setEvent = event => ({
  type: 'EVENT_SET',
  payload: event,
});

const eventCreateRequest = event => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${API_URL}${routes.EVENT}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...event, profile: profile._id })
    .then((response) => {
      return store.dispatch(setEvent(response.body));
    });
};

const getPrivateEventsRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/profile/events`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getPrivateEvents(response.body));
    });
};

export { eventCreateRequest, getPrivateEventsRequest };
