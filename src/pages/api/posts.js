import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';
import { getArrayUserIds, attachUserToPosts, attachCommentsToPosts } from 'helper/api/posts';

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

export default async (req, res) => {
  const {
    method,
    body,
  } = req;
  if (method === 'GET') {
    try {
      let result = await firestore.posts.lists([['reference', '==', null]], [['timestamp', 'desc']]);
      result = await restructureData(result);
      res.status(200).send(responseSuccess(200, result));
    } catch (err) {
      res.status(500).send(responseError(500, err.message));
    }
    return;
  }

  if (method === 'POST') {
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
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
};
