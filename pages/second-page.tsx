import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import { RootState, actions } from '~/redux';
import DefaultLayout from '~/layouts/default';

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export type Props = {
  initialLocalCount: number;
};

const SecondPage: NextPage<Props> = ({ initialLocalCount }) => {
  const [localCount, setLocalCount] = useState(initialLocalCount);
  const dispatch = useDispatch();
  const storeState = useSelector((state: RootState) => state);
  const onAddClick = useCallback(() => dispatch(actions.domain.counter.increment()), [dispatch]);

  useEffect(() => {
    const intervalID = setInterval(() => setLocalCount(state => state + 1), 1000);

    return () => clearInterval(intervalID);
  });

  return (
    <DefaultLayout>
      <div>
        <h1>
          Welcome To Second Page. {localCount}, {storeState.domain.counter.count}
        </h1>
        <button type="button" onClick={onAddClick}>
          Add
        </button>
        <Link href="/">
          <button type="button">Go Back</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

SecondPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const isServer = context.req != null;
  if (isServer) {
    wait(1000);
    return { initialLocalCount: 1234 };
  }

  return { initialLocalCount: 0 };
};

export default SecondPage;
