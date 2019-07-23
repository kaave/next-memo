import React from 'react';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import Link from 'next/link';

import { RootState, actions } from '~/redux';
import DefaultLayout from '~/layouts/default';
import styles from './index.scss';
import { getMeta } from '@/utils/meta';
import Head from '~/components/Head';

export type Props = {
  localCount: number;
};

export type State = {};

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const mapStateToProps = (state: RootState) => ({ reduxCount: state.domain.counter.count });
const mapDispatchToProps = (dispatch: any /* , props: Props */) => ({
  add: (n: number) => dispatch(actions.domain.counter.add({ count: n })),
});

type WithReduxProps = Props & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends React.Component<WithReduxProps, State> {
  intervalTimer: NodeJS.Timeout | null = null;
  state = {};

  static getInitialProps = async (context: NextPageContext): Promise<Props> => {
    const isServer = context.req != null;
    if (isServer) {
      wait(1000);
      return { localCount: 10 };
    }

    return { localCount: 0 };
  };

  componentDidMount() {
    const { add } = this.props;
    this.intervalTimer = setInterval(() => add(1), 1000);
  }

  componentWillUnmount() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }

  render() {
    const { localCount, reduxCount } = this.props;

    return (
      <DefaultLayout>
        <Head {...getMeta()} />
        <main id="main" className={styles.Home}>
          <h1>
            Hello, World! localCount: {localCount} ReduxCount: {reduxCount}
          </h1>
          <Link href="/signin">
            <button type="button">Goto Signin Page</button>
          </Link>
          <Link href="/second-page">
            <button type="button">Goto Second Page</button>
          </Link>
          <Link href="/dynamic">
            <button type="button">Goto Dynamic Page</button>
          </Link>
        </main>
      </DefaultLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
