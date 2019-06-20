import React from 'react';
import Link from 'next/link';

import DefaultLayout from '../src/layouts/default';

const SecondPage: React.FunctionComponent = () => (
  <DefaultLayout>
    <div>
      <h1>Welcome To Second Page</h1>
      <Link href="/">
        <button type="button">Go Back</button>
      </Link>
    </div>
  </DefaultLayout>
);

export default SecondPage;
