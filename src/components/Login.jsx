import {
  useContext,
  memo,
} from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
} from 'grommet';

import { AuthenticatedContext } from './Authenticated';
import { StatusContext } from './StatusWrapper';

const Login = () => {
  const {
    status,
    setLoading,
    setIdle,
    setError,
  } = useContext(StatusContext);
  const { login } = useContext(AuthenticatedContext);

  const onSubmit = async ({ value }) => {
    if (status === 'loading') return;
    try {
      setLoading();
      await login('form', value);
      setIdle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormField name="email" label="Email">
        <TextInput name="email" required type="email" />
      </FormField>
      <FormField name="password" label="Password">
        <TextInput name="password" type="password" required />
      </FormField>
      {status !== 'idle' && status !== 'loading' && (
      <Text color="status-error" size="small">{status}</Text>
      )}
      <Box margin={{ top: 'medium' }}>
        <Button type="submit" label="Log In" primary />
      </Box>
    </Form>
  );
};

export default memo(Login);
