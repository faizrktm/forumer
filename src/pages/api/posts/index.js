import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';
import { restructureData, restructureDataDetail } from 'helper/api/posts';
import authMiddleware from 'helper/api/authMiddleware';

const handlePost = async (req, res) => {
  const {
    body,
    headers,
  } = req;
  try {
    const { user } = JSON.parse(headers.authorization || '{}');
    const { uid } = user;
    const payload = { ...body, reference: null, uid };
    let result = await firestore.posts.add(payload);
    result = await restructureDataDetail(result);
    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

const handleGet = async (req, res) => {
  try {
    const { query } = req;
    let result = await firestore.posts.lists({
      where: [['reference', '==', null]],
      orderBy: [['timestamp', 'desc']],
      limit: 10,
      startAfter: query.start_after,
    });
    result = await restructureData(result);
    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

export default async (req, res) => {
  const {
    method,
  } = req;
  if (method === 'GET') {
    await handleGet(req, res);
    return;
  }
  if (method === 'POST') {
    await authMiddleware((_req, _res) => handlePost(_req, _res))(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};
