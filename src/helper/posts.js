import config from 'config';

// eslint-disable-next-line import/prefer-default-export
export async function addPost(payload, token) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(token),
    },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(config.API.POSTS, options);
    const json = await response.json();
    if (json.code !== 200) {
      throw new Error(json.result.message);
    }
    return ({ [json.result.id]: json.result });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addComment(payload, token, post) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(token),
    },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(config.API.POSTS, options);
    const json = await response.json();
    if (json.code !== 200) {
      throw new Error(json.result.message);
    }
    return {
      ...post,
      comments: {
        ...post.comments,
        [json.result.id]: json.result,
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
