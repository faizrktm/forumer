import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';
import { getArrayUserIds, attachUserToPosts } from 'helper/api/posts';
import authMiddleware from 'helper/api/authMiddleware';

const restructureData = async (post) => {
  if (!Object.keys(post).length) return post;

  const userIds = getArrayUserIds(post);
  const users = await firestore.users.lists({
    where: [['uid', 'in', userIds]],
  });
  const result = attachUserToPosts(post, users);
  return result;
};

const handlePost = async (req, res) => {
  const {
    body,
    headers,
  } = req;
  try {
    const { user } = JSON.parse(headers.authorization || '{}');
    const { uid } = user;
    let payload = { ...body, uid };
    if (!body.reference) {
      payload = { ...payload, reference: null };
    }
    let result = await firestore.posts.add(payload);
    // if had reference, it is a commment post
    // increment total_comments for the reference
    if (payload.reference) {
      await firestore.commentsCounter.increment(payload.reference, 'total_comments');
    }
    result = await restructureData({
      [result.id]: result,
    });
    result = result[Object.keys(result)[0]];
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
