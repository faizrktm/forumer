import { memo, useContext } from 'react';
import { ReduxerContext, ReduxerProvider } from 'components/Reduxer';
import { Box } from 'grommet';
import { timestampToHumans } from 'helper/times';

import config from 'config';
import Comments from 'components/Comments';
import PostCard from './PostCard';

const Post = () => {
  const { data } = useContext(ReduxerContext);

  if (!data) return null;

  return (
    <Box gap="medium" margin={{ top: 'medium' }}>
      <PostCard
        key={data.id}
        id={data.id}
        content={data.content}
        name={data.user.name}
        time={timestampToHumans(data.timestamp._seconds)}
      />
      <ReduxerProvider uri={`${config.API.POSTS}/${data.id}/comments`}>
        <Comments reference={data.id} totalComments={data.total_comments} />
      </ReduxerProvider>
    </Box>
  );
};

export default memo(Post);
