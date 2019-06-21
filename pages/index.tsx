import React from 'react';
import Link from 'next/link';

import DefaultLayout from '~/layouts/default';
import styles from './index.scss';

const HomePage: React.FC = () => (
  <DefaultLayout>
    <main id="main" className={styles.Home}>
      <h1>Hello, World!</h1>
      <Link href="/second-page">
        <button type="button">Goto Second Page</button>
      </Link>
    </main>
  </DefaultLayout>
);

export default HomePage;
