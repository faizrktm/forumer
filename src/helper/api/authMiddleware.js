import { responseError } from './response';

const middleware = (handler) => (req, res) => {
  const { token } = JSON.parse(req.headers.authorization || '{}');
  if (!token) {
    res.status(403).send(responseError(403, 'Un-authorized access'));
    return null;
  }

  return handler(req, res);
};

export default middleware;
