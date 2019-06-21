import React from 'react';
import Link from 'next/link';

import DefaultLayout from '../src/layouts/default';
import styles from './index.scss';

const HomePage: React.FC = () => (
  <DefaultLayout>
    <main id="main" className={styles.Home}>
      <h1>Hello, World!</h1>
      <img src="/static/images/abe.png" alt="" />
      <Link href="/second-page">
        <button type="button">Goto Second Page</button>
      </Link>
    </main>
  </DefaultLayout>
);

export default HomePage;
