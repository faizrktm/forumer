import App from 'next/app';
import { Grommet } from 'grommet';
import PropTypes from 'prop-types';
import nextCookies from 'next-cookies';

import theme from 'config/theme';
import 'styles/normalize.css';
import 'styles/local.css';
import config from 'config';
import { AuthenticatedProvider } from 'components/Authenticated';
import Request, { isServer } from 'helper/request';

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <AuthenticatedProvider user={pageProps.user}>
        <Component {...pageProps} />
      </AuthenticatedProvider>
    </Grommet>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  const appProps = await App.getInitialProps(appContext);

  // only run on server-side, user should be auth'd if on client-side
  if (isServer()) {
    const token = nextCookies(ctx)[config.TOKEN_COOKIES_NAME];

    // if token found, try to validate
    if (token) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: JSON.stringify({ token }),
        };
        const request = new Request(req);
        const { baseUrl } = request;
        const result = await fetch(`${baseUrl}${config.API.VALIDATE}`, { headers });
        const json = await result.json();
        if (json.code !== 200) {
          throw new Error(json.result.message);
        }
        // Fill appProps.pageProps to pass to pages as props.
        appProps.pageProps = { user: json.result };
      } catch (e) {
        // let exceptions fail silently
        // could be invalid token, just let client-side deal with that
      }
    }
  }
  return { ...appProps };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default MyApp;
