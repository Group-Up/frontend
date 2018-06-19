const GU_001 = 'Image is required';
const GU_002 = 'Invalid image';

export const validateImage = (image) => {
  if (!image) {
    throw new Error(GU_001);
  }
  const {
    _id, url, description, account,
  } = image;

  if (!_id || !url || !description || !account) {
    throw new Error(GU_002);
  }
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'USER_IMAGE_CREATE':
      validateImage(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return [];
    default:  
      return state;
  }
};

