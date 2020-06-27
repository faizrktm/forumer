import admin from 'helper/api/admin';
import firestore from 'helper/api/firestore';
import { responseError, responseSuccess } from 'helper/api/response';

const validate = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, true);
    const user = await admin.auth().getUser(decodedToken.uid);
    const result = {
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      },
      token,
    };
    await firestore.users.set(user.uid, result.user);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default async (req, res) => {
  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      return res.status(403).send(responseError(403, 'Auth token missing'));
    }
    const result = await validate(token);
    return res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    return res.status(500).send(responseError(500, err.message));
  }
};
