import superagent from 'superagent';

const getEvent = event => ({
  type: 'GET_SINGLE_EVENT',
  payload: event,
});

const getEventRequest = id => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/events/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getEvent(response.body));
    });
};

export { getEventRequest }; // eslint-disable-line
