import superagent from 'superagent';
import * as routes from '../utils/routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../utils/constants';

export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      // TODO: if not working, check here
      const { token } = response.body;
      return store.dispatch(setToken(token));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      const { token } = response.body;
      return store.dispatch(setToken(token));
    });
};
