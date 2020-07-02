import {
  memo,
  useContext,
} from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
} from 'grommet';

import { password } from 'helper/validation';
import { AuthenticatedContext } from './Authenticated';
import { StatusContext } from './StatusWrapper';

const Login = () => {
  const {
    status,
    setIdle,
    setLoading,
    setError,
  } = useContext(StatusContext);
  const { register } = useContext(AuthenticatedContext);

  const onSubmit = async ({ value }) => {
    if (status === 'loading') return;
    try {
      setLoading();
      await register(value);
      setIdle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormField name="email" label="Email" required>
        <TextInput name="email" required type="email" />
      </FormField>
      <FormField name="password" label="Password" required validate={password}>
        <TextInput name="password" type="password" required />
      </FormField>
      {status !== 'idle' && status !== 'loading' && (
        <Text color="status-error" size="small">{status}</Text>
      )}
      <Box margin={{ top: 'small' }}>
        <Button type="submit" label="Continue" primary />
      </Box>
    </Form>
  );
};

export default memo(Login);
