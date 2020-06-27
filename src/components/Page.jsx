import Head from 'next/head';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { selectColor } from 'helper/theme';
import Header from './Header';

const Page = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <Main>
      {children}
    </Main>
  </>
);

Page.defaultProps = {
  title: 'Forumer',
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;

const Main = styled.main`
  position: relative;
  top: 74px;
  min-height: calc(100vh - 74px);
  margin: 0px auto;
  padding: 14px 16px 32px;
  background-color: ${selectColor('background')};
  width: 100%;
`;
