import { memo, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  FormField,
  Form,
  Button,
  Box,
  TextInput,
} from 'grommet';
import { addPost } from 'helper/posts';
import { AuthenticatedContext } from 'components/Authenticated';
import { ReduxerContext } from 'components/Reduxer';
import Card from 'components/Card';

const Post = () => {
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  const { add, status } = useContext(ReduxerContext);
  const router = useRouter();

  const onSubmit = ({ value }) => {
    if (status === 'loading') return;
    add(() => addPost({ uid: user.user.uid, ...value }, user.token));
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
  const buttonText = status === 'loading' ? 'Memposting...' : 'Post';
  return (
    <Card>
      <Box pad="16px">
        <Form
          onSubmit={onSubmit}
        >
          <FormField name="content">
            <TextInput
              placeholder="What is in your mind today?"
              name="content"
              required
            />
          </FormField>
          <Box margin={{ top: 'small' }}>
            <Button type="submit" color="brand" primary label={buttonText} alignSelf="start" />
          </Box>
        </Form>
      </Box>
    </Card>
  );
};

export default memo(Post);
