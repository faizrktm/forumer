import { responseError, responseSuccess } from 'helper/api/response';
import firestore from 'helper/api/firestore';

const insertUserToPost = async (result) => {
  let users = Object
    .keys(result)
    .reduce((acc, curr) => ({
      ...acc,
      [result[curr].uid]: result[curr].uid,
    }), {});

  users = Object.keys(users).map((item) => item);

  const query = [['uid', 'in', users]];

  const resultUser = await firestore.users.lists(query);

  return Object
    .keys(result)
    .reduce((acc, curr) => ({
      ...acc,
      [curr]: {
        ...result[curr],
        user: resultUser[result[curr].uid],
      },
    }), {});
};

export default async (req, res) => {
  const {
    method,
    body,
  } = req;
  if (method === 'GET') {
    try {
      let result = await firestore.posts.lists();
      result = await insertUserToPost(result);
      res.status(200).send(responseSuccess(200, result));
    } catch (err) {
      res.status(500).send(responseError(500, err.message));
    }
    return;
  }

  if (method === 'POST') {
    try {
      let result = await firestore.posts.add(body);
      result = await insertUserToPost({
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
