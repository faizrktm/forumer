import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import Card from 'components/Card';

const PostCard = ({ content }) => (
  <Card>
    <Box pad="16px">
      <Text size="small" weight="bold">Faiz</Text>
      <Text size="medium">{content}</Text>
    </Box>
  </Card>
);

PostCard.propTypes = {
  content: PropTypes.string.isRequired,
};

export default memo(PostCard);
