import { responseError } from './response';
import admin from './admin';

const authMiddleware = (handler) => async (req, res) => {
  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      throw new Error('Un-authorized access');
    }
    await admin.auth().verifyIdToken(token, true);
    return handler(req, res);
  } catch (error) {
    res.status(403).send(responseError(403, error.message));
    return null;
  }
};

export default authMiddleware;
