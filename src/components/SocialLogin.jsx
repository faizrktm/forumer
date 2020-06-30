import { useContext, memo, useCallback } from 'react';
import { Button, Box, Text } from 'grommet';
import { Google, FacebookOption } from 'grommet-icons';

import { AuthenticatedContext } from './Authenticated';
import { StatusContext } from './StatusWrapper';

const SocialLogin = () => {
  const { login } = useContext(AuthenticatedContext);
  const { setError, setIdle, setLoading } = useContext(StatusContext);
  const onLogin = useCallback(async (type) => {
    try {
      setLoading();
      await login(type);
      setIdle();
    } catch (error) {
      setError(error.message);
    }
  });
  return (
    <Box gap="medium">
      <Box align="center" justify="center">
        <Text weight="bold">OR</Text>
      </Box>
      <Button
        icon={<Google size="medium" />}
        color="light-2"
        primary
        onClick={() => onLogin('google')}
        label="Continue with Google"
      />
      <Button
        icon={<FacebookOption size="medium" />}
        color="facebook"
        primary
        onClick={() => onLogin('facebook')}
        label="Continue with Facebook"
      />
    </Box>
  );
};

export default memo(SocialLogin);
