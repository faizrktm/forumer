import PropTypes from 'prop-types';

import config from 'config';
import Page from 'components/Page';
import { ReduxerProvider } from 'components/Reduxer';
import Detail from 'components/Posts/Detail';

export default function Post({ id }) {
  return (
    <ReduxerProvider uri={`${config.API.POSTS}/${id}`}>
      <Page>
        <Detail />
      </Page>
    </ReduxerProvider>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
    },
  };
}
