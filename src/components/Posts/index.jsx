import { memo, useContext } from 'react';
import { ReduxerContext } from 'components/Reduxer';
import { Box } from 'grommet';
import PostCard from './PostCard';

const Posts = () => {
  const { data } = useContext(ReduxerContext);

  return (
    <Box gap="small" margin={{ top: 'medium' }}>
      {Object.keys(data).map((item) => (
        <PostCard
          key={item}
          content={data[item].content}
          name={data[item].user.name}
        />
      ))}
    </Box>
  );
};

export default memo(Posts);
