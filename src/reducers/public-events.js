export default (state = [], { type, payload }) => {
  switch (type) {
    case 'EVENTS_GET_PUBLIC':
      return payload;
    case 'TOKEN_REMOVE':
      return {};
    default:
      return state;
  }
};
