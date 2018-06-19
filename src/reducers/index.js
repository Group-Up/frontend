import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import posts from './posts';
import events from './event';

export default combineReducers({
  token, profile, posts, events, 
});
