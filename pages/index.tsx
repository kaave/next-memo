import React from 'react';
import { NextFC } from 'next';
import Link from 'next/link';

import DefaultLayout from '~/layouts/default';
import styles from './index.scss';

export type Props = {
  count: number;
};

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const HomePage: NextFC<Props> = ({ count = 0 }) => (
  <DefaultLayout>
    <main id="main" className={styles.Home}>
      <h1>Hello, World! {count}</h1>
      <Link href="/second-page">
        <button type="button">Goto Second Page</button>
      </Link>
    </main>
  </DefaultLayout>
);

HomePage.getInitialProps = async context => {
  wait(1000);
  return { count: 10 };
};

export default HomePage;
