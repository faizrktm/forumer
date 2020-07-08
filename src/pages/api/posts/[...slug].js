import { restructureDataDetail, restructureData } from 'helper/api/posts';
import { responseSuccess, responseError } from 'helper/api/response';
import firestore from 'helper/api/firestore';
import authMiddleware from 'helper/api/authMiddleware';

const handleGetComments = async (req, res, id) => {
  try {
    const { query } = req;
    const condition = {
      where: [['reference', '==', id]],
      orderBy: [['timestamp', 'desc']],
      limit: 10,
      startAfter: query.startAfter,
    };
    let result = await firestore.posts.lists(condition);
    result = await restructureData(result);
    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

const handleGet = async (id, res) => {
  try {
    let result = await firestore.posts.get(id);
    result = await restructureDataDetail(result);
    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

const handlePostComment = async (req, res, id) => {
  try {
    const {
      body,
      headers,
    } = req;
    const { user } = JSON.parse(headers.authorization || '{}');
    const { uid } = user;
    const payload = { ...body, uid, reference: id };
    let result = await firestore.posts.add(payload);

    // increment total comments
    await firestore.posts.increment(id, 'total_comments');

    result = await restructureDataDetail(result);

    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

export default async (req, res) => {
  const {
    method,
    query: { slug },
  } = req;
  const [id, second] = slug;
  if (method === 'GET' && !second) {
    await handleGet(id, res);
    return;
  }
  if (method === 'GET' && second === 'comments') {
    await handleGetComments(req, res, id);
    return;
  }
  if (method === 'POST' && second === 'comments') {
    await authMiddleware((_req, _res) => handlePostComment(_req, _res, id))(req, res);
    return;
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
};
