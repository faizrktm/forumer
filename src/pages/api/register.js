import firestore from 'helper/api/firestore';
import { responseSuccess, responseError } from 'helper/api/response';
import admin from 'firebase-admin';

const handler = async (req, res) => {
  try {
    const {
      body,
    } = req;
    const { token, user } = body;
    await admin.auth().verifyIdToken(token, true);
    await firestore.users.set(user.uid, user);
    return res.status(201).send(responseSuccess(201));
  } catch (err) {
    return res.status(500).send(responseError(500, err.message));
  }
};

export default handler;
