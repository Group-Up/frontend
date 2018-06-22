const D23_004 = 'No post returned';

const validatePosts = (post) => {
  if (!post) throw new Error(D23_004);
  if (!post._id) throw new Error('Bad post');
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'TOKEN_REMOVE':
      return [];
    case 'POSTS_GET':
      return payload;
    case 'POST_CREATE':
      validatePosts(payload);
      return [...state, payload];
    case 'POST_REMOVE':
      return state.filter(post => post._id !== payload._id);
    case 'POST_UPDATE':
      return state.map(post => (post._id === payload._id ? payload : post));
    case 'IMAGE_CREATE':
      validatePosts(payload);
      return [...state, payload];
    default:
      return state;
  }
};
