
export const TOKEN_COOKIE_KEY = 'GU-Token';
export const CREATE_ACCOUNT = 'Don\'t have an account? Create one.';
export const DASHBOARD_EMAIL_SUBJECT = 'Hello from GroupUp!';
export const DASHBOARD_EMAIL_BODY = 'Please join the app! Find it at groupup.site';
export const EVENT_EMAIL_SUBJECT = 'Attend my event';
export const EVENT_EMAIL_BODY = 'Please let me know if you can come to my event. Visit it at ';
const redirect = process.env.API_URL || 'http://api.groupup.site';

export const GOOGLE_LOGIN_REDIRECT = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect}/oauth/google&scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts&client_id=748380772658-psacdj09a5ba7e69jln5up3q0b3e4dvu.apps.googleusercontent.com&prompt=consent&response_type=code`;
export const FAVICON = 'https://groupup.s3.us-west-2.amazonaws.com/c665973f001ba0f4cd32c8b459ecea79.GroupUpFavicon.png';

