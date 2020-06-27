import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';

export default async (req, res) => {
  const {
    method,
    body,
  } = req;
  if (method === 'GET') {
    try {
      const result = await firestore.posts.lists();
      res.status(200).send(responseSuccess(200, result));
    } catch (err) {
      res.status(500).send(responseError(500, err.message));
    }
    return;
  }

  if (method === 'POST') {
    try {
      const result = await firestore.posts.add(body);
      res.status(200).send(responseSuccess(200, result));
    } catch (err) {
      res.status(500).send(responseError(500, err.message));
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};
