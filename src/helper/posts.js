import config from 'config';

export async function addPost(payload, user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(user),
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

export async function addComment(id, payload, user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(user),
    },
    body: JSON.stringify(payload),
  };
  try {
    const uri = `${config.API.POSTS}/${id}/comments`;
    const response = await fetch(uri, options);
    const json = await response.json();
    if (json.code !== 200) {
      throw new Error(json.result.message);
    }
    return {
      [json.result.id]: json.result,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
