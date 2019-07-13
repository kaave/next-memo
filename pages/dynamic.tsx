import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import DefaultLayout from '~/layouts/default';

const DynamicHello = dynamic(() => import('~/components/Hello'), { loading: () => <p>now loading...</p> });

export type Props = {};

const DynamicPage: NextPage<Props> = () => {
  return (
    <DefaultLayout>
      <div>
        <DynamicHello name="John Doe" />
        <Link href="/">
          <button type="button">Go Back</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default DynamicPage;
