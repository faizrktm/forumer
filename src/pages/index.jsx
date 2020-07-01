import { useEffect, useContext } from 'react';
import useSWR from 'swr';

import config from 'config';
import Page from 'components/Page';
import PostForm from 'components/Posts/PostForm';
import Posts from 'components/Posts';
import { ReduxerContext } from 'components/Reduxer';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data } = useSWR(config.API.POSTS, fetcher);
  const { addRaw } = useContext(ReduxerContext);

  useEffect(() => {
    if (data) {
      addRaw(data.result);
    }
  }, [data]);

  return (
    <Page>
      <PostForm />
      <Posts />
    </Page>
  );
}
