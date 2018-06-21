import superagent from 'superagent';
import * as routes from '../utils/routes';

const getEvents = events => ({
  type: 'EVENTS_GET',
  payload: events,
});

const setEvent = event => ({
  type: 'EVENT_SET',
  payload: event,
});

const updateEvent = event => ({
  type: 'EVENT_UPDATE',
  payload: event,
});

const removeEvent = event => ({
  type: 'EVENT_REMOVE',
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
      return store.dispatch(getEvents(response.body));
    });
};

const getPublicEventsRequest = () => (store) => {
  return superagent.get(`${API_URL}/events/public`)
    .then((response) => {
      return store.dispatch(getEvents(response.body));
    });
};

const updateEventRequest = event => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/events/${event._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(event)
    .then((response) => {
      return store.dispatch(updateEvent(response.body));
    });
};

const removeEventRequest = event => (store) => {
  const { token } = store.getState();
  return superagent.del(`${API_URL}/events/${event._id}`)
    .set('Authorization', `Bearer ${token}`)
    .then(() => {
      return store.dispatch(removeEvent(event));
    });
};

export {
  eventCreateRequest,
  getPrivateEventsRequest,
  removeEventRequest,
  updateEventRequest,
  getPublicEventsRequest,
};
