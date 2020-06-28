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
