import cookies from 'js-cookie';
import config from 'config';
import firebase from 'helper/api/firebase';

export const validate = async () => {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error('Token Expired / User Not Found');
    }
    const token = await firebase.auth().currentUser.getIdToken(true);
    cookies.set(config.TOKEN_COOKIES_NAME, token);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({ token }),
    };
    const response = await fetch(config.API.VALIDATE, { headers });
    const json = await response.json();
    if (json.code !== 200) {
      throw new Error(json.result.message);
    }
    return json.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 *
 * @param {[google,password]} type
 * @param {{email, password}?} body only pass this if using password type of authentication
 */
async function authenticate(type, body) {
  try {
    let result = {};
    if (type === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      const token = await validate();
      result = token;
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default authenticate;
