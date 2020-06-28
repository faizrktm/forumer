import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';
import { getArrayUserIds, attachUserToPosts, attachCommentsToPosts } from 'helper/api/posts';
import authMiddleware from 'helper/api/authMiddleware';

const restructureData = async (post) => {
  const userIds = getArrayUserIds(post);
  const userQuery = [['uid', 'in', userIds]];
  const users = await firestore.users.lists(userQuery);
  let result = attachUserToPosts(post, users);

  const postIds = Object.keys(post).map((item) => item);
  const commentQuery = [['reference', 'in', postIds]];
  const comments = await firestore.posts.lists(commentQuery, [['timestamp', 'asc']]);

  if (Object.keys(comments).length) {
    const commentUserIds = getArrayUserIds(comments);
    const commentUserQuery = [['uid', 'in', commentUserIds]];
    const commentUsers = await firestore.users.lists(commentUserQuery);
    const commentWithUsers = attachUserToPosts(comments, commentUsers);

    result = attachCommentsToPosts(result, commentWithUsers);
  }

  return result;
};

const handlePost = async (req, res) => {
  const {
    body,
  } = req;
  try {
    let payload = { ...body };
    if (!body.reference) {
      payload = { ...payload, reference: null };
    }
    let result = await firestore.posts.add(payload);
    result = await restructureData({
      [result.id]: result,
    });
    result = result[Object.keys(result)[0]];
    res.status(200).send(responseSuccess(200, result));
  } catch (err) {
    res.status(500).send(responseError(500, err.message));
  }
};

const handleGet = async (_req, res) => {
  try {
    let result = await firestore.posts.lists([['reference', '==', null]], [['timestamp', 'desc']], 10);
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
