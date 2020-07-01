import config from 'config';
import Page from 'components/Page';
import PostForm from 'components/Posts/PostForm';
import Posts from 'components/Posts';
import { ReduxerProvider } from 'components/Reduxer';

export default function Home() {
  return (
    <ReduxerProvider uri={config.API.POSTS}>
      <Page>
        <PostForm />
        <Posts />
      </Page>
    </ReduxerProvider>
  );
}
