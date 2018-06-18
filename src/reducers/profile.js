const D23_001 = 'Profile is required';
const D23_002 = 'Invalid Profile';

const validateProfile = (profile) => {
  if (!profile) {
    throw new Error(D23_001);
  }
  const {
    bio,
  } = profile;

  if (!bio) {
    throw new Error(D23_002);
  }
  return undefined; // Zachary -double check if return undefined is needed
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
