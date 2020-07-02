import {
  memo,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Form,
  FormField,
  Text,
  TextInput,
} from 'grommet';
import { addPost } from 'helper/posts';
import { AuthenticatedContext } from 'components/Authenticated';
import { ReduxerContext } from 'components/Reduxer';
import Card from 'components/Card';

const Post = () => {
  const formRef = useRef(null);
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  const { mutate, error } = useContext(ReduxerContext);
  const router = useRouter();

  const onSubmit = ({ value }) => {
    if (formRef.current) formRef.current.reset();
    mutate(() => addPost(value, user));
  };

  const onNavigateToLogin = useCallback((e) => {
    e.preventDefault();
    router.push('/login');
  }, []);

  if (!isLoggedIn) {
    return (
      <Button
        label="Please login to post"
        primary
        color="brand"
        onClick={onNavigateToLogin}
      />
    );
  }

  return (
    <Card>
      <Box pad="16px">
        <Form
          onSubmit={onSubmit}
          ref={formRef}
        >
          <FormField name="content" required>
            <TextInput
              placeholder="What is in your mind today?"
              name="content"
              required
            />
          </FormField>
          {error && <Text size="small" color="status-error">{error.message}</Text>}
          <Box margin={{ top: 'small' }}>
            <Button type="submit" color="brand" primary label="Post" />
          </Box>
        </Form>
      </Box>
    </Card>
  );
};

export default memo(Post);
