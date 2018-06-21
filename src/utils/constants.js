
export const TOKEN_COOKIE_KEY = 'GU-Token';
export const CREATE_ACCOUNT = 'Don\'t have an account? Create one.';
export const EMAIL_SUBJECT = 'Hello from GroupUp!';
export const EMAIL_BODY = 'Please join the app {group up site link here}'; // TODO: change
let redirect;
if (!process.env.API_URL) redirect = API_URL;
else redirect = process.env.API_URL;
// export const GOOGLE_LOGIN_REDIRECT = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect}/oauth/google&scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts&client_id=748380772658-s92lpugvb245s1n5inds0dgr845eocc6.apps.googleusercontent.com&prompt=consent&response_type=code`;

export const GOOGLE_LOGIN_REDIRECT = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect}/oauth/google&scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts&client_id=748380772658-psacdj09a5ba7e69jln5up3q0b3e4dvu.apps.googleusercontent.com&prompt=consent&response_type=code`;

