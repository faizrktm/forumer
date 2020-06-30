import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor, Text } from 'grommet';
import { useRouter } from 'next/router';

import { StatusProvider, StatusContext } from './StatusWrapper';
import Card from './Card';
import SocialLogin from './SocialLogin';
import Loading from './Loading';

const authType = {
  login: {
    callback: '/sign-up',
    label: 'Not on Forumer yet? Sign Up',
  },
  'sign-up': {
    callback: '/login',
    label: 'Already a member? Log In',
  },
};

const Authentication = ({ children, type }) => {
  const router = useRouter();
  return (
    <StatusProvider>
      <Card>
        <Box pad="16px" gap="medium">
          <Box>
            {children}
          </Box>
          <SocialLogin />
          <Box align="center" justify="center">
            <Box width="20%" border={{ color: 'placeholder', size: '1px', side: 'bottom' }} background="placeholder" margin={{ vertical: 'small' }} />
            <Anchor
              label={<Text weight="bold" size="small" color="text">{authType[type].label}</Text>}
              onClick={() => router.push(authType[type].callback)}
            />
          </Box>
        </Box>
        <StatusContext.Consumer>
          {({ status }) => {
            if (status !== 'loading') {
              return null;
            }
            return <Loading text="Processing..." />;
          }}
        </StatusContext.Consumer>
      </Card>
    </StatusProvider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(Authentication);
