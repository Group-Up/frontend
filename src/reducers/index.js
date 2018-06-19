import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import posts from './posts';

export default combineReducers({ token, profile, posts });
