import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import DefaultLayout from '~/layouts/default';

export type Props = {
  name: string;
};

const UsersNamePage: NextPage<Props> = ({ name }) => {
  return (
    <DefaultLayout>
      <div>
        <h1>Who are you? Maybe {name}</h1>
        <Link href="/">
          <button type="button">Go Back</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

UsersNamePage.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const { name } = query;
  return { name: name instanceof Array ? name[0] : name };
};

export default UsersNamePage;
