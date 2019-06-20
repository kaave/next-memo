import React from 'react';
import Link from 'next/link';

import styles from './index.scss';

const HomePage: React.FunctionComponent = () => (
  <div className={styles.Home}>
    <h1>Hello, World!</h1>
    <Link href="/second-page">
      <button type="button">Goto Second Page</button>
    </Link>
  </div>
);

export default HomePage;
