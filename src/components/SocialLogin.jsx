import { useContext, memo } from 'react';
import { Button, Box, Text } from 'grommet';
import { Google, FacebookOption } from 'grommet-icons';

import { AuthenticatedContext } from './Authenticated';

const SocialLogin = () => {
  const { login } = useContext(AuthenticatedContext);
  return (
    <Box gap="medium">
      <Box align="center" justify="center">
        <Text weight="bold">OR</Text>
      </Box>
      <Button
        icon={<Google size="medium" />}
        color="light-2"
        primary
        onClick={() => login('google')}
        label="Continue with Google"
      />
      <Button
        icon={<FacebookOption size="medium" />}
        color="facebook"
        primary
        onClick={() => login('facebook')}
        label="Continue with Facebook"
      />
    </Box>
  );
};

export default memo(SocialLogin);
