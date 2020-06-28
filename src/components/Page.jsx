import Head from 'next/head';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  title: process.env.NEXT_PUBLIC_PROJECT_NAME,
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
  max-width: 480px;
  background-color: transparent;
  width: 100%;
`;
