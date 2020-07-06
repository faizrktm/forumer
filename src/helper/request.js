export function isServer() {
  return !(
    typeof window !== 'undefined'
    && window.document
    && window.document.createElement
  );
}

export default class Request {
  constructor(req) {
    if (isServer() && !req) {
      throw new Error('Request must be set');
    }

    this.req = req;
  }

  get host() {
    return isServer() ? this.req.headers.host : window.location.hostname;
  }

  get localhost() {
    return this.host.includes('localhost');
  }

  get protocol() {
    let defaultProtocol = 'https';
    if (this.localhost) {
      defaultProtocol = 'http';
    }
    return defaultProtocol;
  }

  get baseUrl() {
    return `${this.protocol}://${this.host}`;
  }
}
