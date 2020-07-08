import firestore from './firestore';

export const getArrayUserIds = (obj) => {
  let users = Object
    .keys(obj)
    .reduce((acc, curr) => ({
      ...acc,
      [obj[curr].uid]: obj[curr].uid,
    }), {});

  users = Object.keys(users).map((item) => item);

  return users;
};

export const attachUserToPosts = (posts, users) => Object
  .keys(posts)
  .reduce((acc, curr) => ({
    ...acc,
    [curr]: {
      ...posts[curr],
      user: users[posts[curr].uid],
    },
  }), {});

export const attachCommentsToPosts = (posts, comments) => {
  const commentsByReference = Object.keys(comments).reduce((acc, curr) => {
    const comment = comments[curr];
    const { reference } = comment;
    return ({
      ...acc,
      [reference]: {
        ...(acc[reference] || {}),
        [curr]: comment,
      },
    });
  }, {});

  return Object
    .keys(posts)
    .reduce((acc, curr) => ({
      ...acc,
      [curr]: {
        ...posts[curr],
        comments: commentsByReference[curr] || {},
      },
    }), {});
};

export const restructureData = async (post) => {
  if (!Object.keys(post).length) return post;

  const userIds = getArrayUserIds(post);
  const users = await firestore.users.lists({
    where: [['uid', 'in', userIds]],
  });
  const result = attachUserToPosts(post, users);
  return result;
};

export const restructureDataDetail = async (post) => {
  if (!post) return post;
  const { uid } = post;
  const user = await firestore.users.get(uid);
  return {
    ...post,
    user,
  };
};
