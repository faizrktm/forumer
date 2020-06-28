import PropTypes from 'prop-types';

import config from 'config';
import Page from 'components/Page';
import PostForm from 'components/Posts/PostForm';
import { ReduxerProvider } from 'components/Reduxer';
import Posts from 'components/Posts';

export default function Home({ posts }) {
  return (
    <Page>
      <ReduxerProvider initialValue={posts}>
        <PostForm />
        <Posts />
      </ReduxerProvider>
    </Page>
  );
}

Home.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  let posts = {};
  try {
    const res = await fetch(config.API.POSTS);
    const result = await res.json();

    if (result.code !== 200) {
      throw new Error(result.result.message);
    }
    posts = result.result;
  } catch (error) {
    // ignore
  }

  // Pass data to the page via props
  return { props: { posts } };
}
