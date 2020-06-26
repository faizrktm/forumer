import { Grommet } from 'grommet';
import PropTypes from 'prop-types';

import theme from 'config/theme';
import 'styles/normalize.css';
import 'styles/local.css';

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <Component {...pageProps} />
    </Grommet>
  );
}

MyApp.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyApp;
