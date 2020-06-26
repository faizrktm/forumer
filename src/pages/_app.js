import { Grommet } from 'grommet';

import theme from 'config/theme';
import 'styles/normalize.css';
import 'styles/local.css';

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <Component {...pageProps} />
    </Grommet>
  )
}

export default MyApp;
