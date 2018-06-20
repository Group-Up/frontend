const D23_005 = 'No Events';

export default (state = [], { type, payload }) => {
  const validateEvents = (events) => {
    if (!events) throw new Error(D23_005);
  };

  switch (type) {
    case 'EVENT_SET':
      validateEvents(payload);
      return [...state, payload];
    case 'EVENTS_GET':
      validateEvents(payload);
      return payload;
    case 'GET_SINGLE_EVENT':
      validateEvents(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
