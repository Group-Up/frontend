import superagent from 'superagent';
import * as routes from '../utils/routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../utils/constants';

const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      // TODO: if not working, check here
      const { token } = response.body;
      return store.dispatch(setToken(token));
    });
};

const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      // TODO: if not working, check here
      const { token } = response.body;
      return store.dispatch(setToken(token));
    });
};

export { logout, loginRequest, signupRequest };
