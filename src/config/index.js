export const server = process.env.NEXT_PUBLIC_API_URL;
export default {
  TOKEN_COOKIES_NAME: 'GoogleIDToken',
  API: {
    VALIDATE: `${server}/api/validate`,
    POSTS: `${server}/api/posts`,
  },
};
