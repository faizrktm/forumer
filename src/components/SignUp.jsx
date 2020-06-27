import { useContext, memo, useState } from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
  Anchor,
} from 'grommet';
import styled from 'styled-components';
import { breakpoint } from 'styled-components-breakpoint';
import { useRouter } from 'next/router';

import { AuthenticatedContext } from './Authenticated';
import Card from './Card';
import SocialLogin from './SocialLogin';
import Loading from './Loading';

const Login = () => {
  const [status, setStatus] = useState('idle');
  const { register } = useContext(AuthenticatedContext);
  const router = useRouter();

  const onSubmit = async ({ value }) => {
    if (status === 'loading') return;
    try {
      setStatus('loading');
      await register(value);
      setStatus('idle');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <StyledCard>
      <Box pad="16px" gap="small">
        <Box>
          <Form onSubmit={onSubmit}>
            <FormField name="email" label="Email">
              <TextInput name="email" required type="email" />
            </FormField>
            <FormField name="password" label="Password">
              <TextInput name="password" type="password" required />
            </FormField>
            <Box margin={{ top: 'medium' }}>
              <Button type="submit" label="Continue" primary />
            </Box>
          </Form>
        </Box>
        <SocialLogin />
        <Box align="center" justify="center">
          <Box width="20%" border={{ color: 'placeholder', size: '1px', side: 'bottom' }} background="placeholder" margin={{ vertical: 'small' }} />
          <Anchor
            label={<Text weight="bold" size="small" color="text">Already a Member? Log In</Text>}
            onClick={() => router.push('/login')}
          />
        </Box>
      </Box>
      {status === 'loading' && <Loading text="Processing..." />}
    </StyledCard>
  );
};

export default memo(Login);

const StyledCard = styled(Card)`
  width: 100%;
  margin: 0px auto;

  ${breakpoint('desktop')`
    width: 40%;
  `}
`;