import cookies from 'js-cookie';
import config from 'config';
import firebase from 'helper/api/firebase';

export const restructureUser = (user, token) => {
  if (!user || !token) {
    return 'user or token is missing';
  }
  return ({
    user: {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
    },
    token,
  });
};

export const validate = async () => {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error('Token Expired / User Not Found');
    }
    const token = await firebase.auth().currentUser.getIdToken(true);
    const result = restructureUser(currentUser, token);
    cookies.set(config.TOKEN_COOKIES_NAME, token);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    cookies.remove(config.TOKEN_COOKIES_NAME);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

const register = async () => {
  try {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      throw new Error('Token Expired / User Not Found');
    }
    const token = await firebase.auth().currentUser.getIdToken(true);
    const result = restructureUser(currentUser, token);
    await fetch(config.API.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param {{email, password}} body
 */
export const signUp = async (body) => {
  const { email, password } = body;
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const result = await register();
    cookies.set(config.TOKEN_COOKIES_NAME, result.token);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param {[google,password]} type
 * @param {{email, password}?} body only pass this if using password type of authentication
 */
export async function signIn(type, body) {
  try {
    let result = {};
    if (type === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      const token = await register();
      result = token;
    }

    if (type === 'facebook') {
      const provider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      const token = await register();
      result = token;
    }

    if (type === 'form') {
      const { email, password } = body;
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await validate();
      result = token;
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}
