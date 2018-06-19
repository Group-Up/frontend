// import superagent from 'superagent';
//
// const getPrivateEvents = events => ({
//   type: 'EVENTS_GET',
//   payload: events,
// });
//
// const getPrivateEventsRequest = events => (store) => {
//   const { token } = store.getState();
//   return superagent.get(`${API_URL}/profile/events`)
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
//     .then((response) => {})
// }