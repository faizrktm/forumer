export const server = process.env.NODE_ENV !== 'production' ? 'https://uneug.vercel.app' : 'http://localhost:3000';
export default {
  TOKEN_COOKIES_NAME: 'GoogleIDToken',
  API: {
    VALIDATE: `${server}/api/validate`,
    POSTS: `${server}/api/posts`,
  },
};
