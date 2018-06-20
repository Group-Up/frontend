
export default (state = [], { type, payload }) => {
  switch (type) {
    case 'EVENT_SET':
      if (state.indexOf(payload) < 0) {
        return [payload, ...state];
      }
      return state;
    case 'EVENTS_GET':
      return payload;
    case 'EVENT_REMOVE':
      return state.filter(event => event._id !== payload._id);
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
