export const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://localhost:3000';
export default {
  TOKEN_COOKIES_NAME: 'GoogleIDToken',
  API: {
    VALIDATE: `${server}/api/validate`,
    POSTS: `${server}/api/posts`,
  },
};
