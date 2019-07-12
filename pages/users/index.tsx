import React, { Fragment } from 'react';
import { NextPage, NextPageContext } from 'next';

export type Props = {};

const UsersPage: NextPage<Props> = () => {
  return <Fragment />;
};

UsersPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const redirectPath = '/users/JohnDoe';
  if (context.res && context.res.writeHead) {
    context.res.writeHead(302, { Location: redirectPath });
    context.res.end();
  } else if (typeof document !== 'undefined' && document.location) {
    document.location.pathname = redirectPath;
  }

  return {};
};

export default UsersPage;
