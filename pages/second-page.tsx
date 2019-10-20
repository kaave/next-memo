import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // eslint-disable-line no-restricted-imports
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
// import { NextJSContext } from 'next-redux-wrapper';

import omoriImage from '@images/omori_futan_woman.png';
import unsplashImage from '@images/sai-de-silva-4-gFGb12hFA-unsplash.jpg';
import { RootState, actions, selectors, operations } from '~/redux';
import DefaultLayout from '~/layouts/default';
import { useInterval } from '~/hooks/useInterval';
import { getMeta, title } from '@/utils/meta';
import Head from '~/components/Head';
import Modal from '~/components/Modal';
import TagList from '~/components/molecules/TagList';

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export type Props = {
  initialLocalCount: number;
};

const useSecondPageHooks = (initialLocalCount: number) => {
  const [localCount, setLocalCount] = useState(initialLocalCount);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const storeState = useSelector((state: RootState) => state);
  const onAddClick = useCallback(() => dispatch(actions.domain.counter.increment()), [dispatch]);
  const onAsyncAddClick = useCallback(() => dispatch(operations.domain.counter.asyncIncrementRequest()), [dispatch]);
  const evenOrOdd = () => selectors.domain.counter.evenOrOdd(storeState.domain.counter);

  useInterval(() => {
    setLocalCount(state => state + 1);
  }, 1000);

  return {
    localCount,
    showModal,
    setShowModal,
    storeState,
    onAddClick,
    onAsyncAddClick,
    evenOrOdd,
  };
};

const SecondPage: NextPage<Props> = ({ initialLocalCount }) => {
  const {
    localCount,
    showModal,
    setShowModal,
    storeState,
    onAddClick,
    onAsyncAddClick,
    evenOrOdd,
  } = useSecondPageHooks(initialLocalCount);

  return (
    <DefaultLayout>
      <Head {...getMeta({ title: `セカンドページ | ${title}`, description: 'このページはセカンドなページです' })} />
      <div>
        <h1>
          Welcome To Second Page. {localCount}, {storeState.domain.counter.count}, {evenOrOdd()}{' '}
          {storeState.application.message}
        </h1>
        <img src={omoriImage} alt="" />
        <img src={unsplashImage} alt="" />
        <button type="button" onClick={onAddClick}>
          Add
        </button>
        <button type="button" onClick={onAsyncAddClick}>
          AsyncAdd
        </button>
        <button type="button" onClick={() => setShowModal(state => !state)}>
          ShowModal
        </button>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>Go Back</a>
        </Link>
        <TagList />
        {showModal && <Modal>Modal!</Modal>}
      </div>
    </DefaultLayout>
  );
};

SecondPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const isServer = context.req != null;
  const {
    store: { dispatch },
  } = context as any; // TODO: maybe @types/next version problem
  if (isServer) {
    await dispatch(operations.application.asyncWriteMessage({ message: 'from server' }));
    await wait(1000);
    return { initialLocalCount: 1234 };
  }

  await dispatch(operations.application.asyncWriteMessage({ message: 'from client' }));
  return { initialLocalCount: 0 };
};

export default SecondPage;
