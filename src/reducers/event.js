export default (state = null, { type, payload }) => {
  switch (type) {
    case 'EVENT_SET':
      return [...state, payload];
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
