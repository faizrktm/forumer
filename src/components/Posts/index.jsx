import { memo, useContext } from 'react';
import { ReduxerContext } from 'components/Reduxer';
import { Box } from 'grommet';
import { timestampToHumans } from 'helper/times';

import PostCard from './PostCard';

const Posts = () => {
  const { data } = useContext(ReduxerContext);
  return (
    <Box gap="medium" margin={{ top: 'medium' }}>
      {Object.keys(data).map((item) => (
        <PostCard
          key={item}
          id={item}
          content={data[item].content}
          name={data[item].user.name}
          time={timestampToHumans(data[item].timestamp._seconds)}
          comments={data[item].comments}
        />
      ))}
    </Box>
  );
};

export default memo(Posts);
