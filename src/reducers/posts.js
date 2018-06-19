const D23_004 = 'No posts';

const validatePosts = (posts) => {
  if (!posts) throw new Error(D23_004);
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'TOKEN_REMOVE':
      return [];
    case 'POSTS_GET':
      validatePosts(payload);
      return payload;
    default:
      return state;
  }
};
