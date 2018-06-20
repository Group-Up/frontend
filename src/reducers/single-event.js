export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'GET_SINGLE_EVENT':
      return payload;
    case 'TOKEN_REMOVE':
      return {};
    default:
      return state;
  }
};
