import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import Card from 'components/Card';

const PostCard = ({ content, name }) => (
  <Card>
    <Box pad="16px">
      <Text size="small" weight="bold">{name}</Text>
      <Text size="medium">{content}</Text>
    </Box>
  </Card>
);

PostCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(PostCard);
