import admin from 'helper/api/admin';
import { responseError, responseSuccess } from 'helper/api/response';
import { restructureUser } from 'helper/authenticate';

const validate = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, true);
    const user = await admin.auth().getUser(decodedToken.uid);
    const result = restructureUser(user, token);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const handler = async (req, res) => {
  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      res.status(403).send(responseError(403, 'Missing token'));
      return null;
    }
    const result = await validate(token);
    return res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    return res.status(500).send(responseError(500, err.message));
  }
};

export default handler;
