import { Button } from 'grommet';
import { Google } from 'grommet-icons';
import { useContext } from 'react';
import { AuthenticatedContext } from './Authenticated';

const Login = () => {
  const { login } = useContext(AuthenticatedContext);

  return (
    <Button
      icon={<Google size="medium" />}
      primary
      color="brand"
      onClick={() => login('google')}
      label="Login with Google"
    />
  );
};

export default Login;
