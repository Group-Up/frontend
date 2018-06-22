export default (state = [], { type, payload }) => {
  switch (type) {
    case 'GET_PUBLIC_EVENTS':
      return payload;
    case 'TOKEN_REMOVE':
      return {};
    default:
      return state;
  }
};
