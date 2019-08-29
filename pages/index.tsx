import React from 'react';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
            Hello, World! localCount: {localCount} ReduxCount:
            <TransitionGroup>
              <CSSTransition key={reduxCount} timeout={1_000_000_000 / 1_000_000} classNames="ReduxCount">
                <span>{reduxCount}</span>
              </CSSTransition>
            </TransitionGroup>
          </h1>
          <Link href="/signin">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Goto Signin Page</a>
          </Link>
          <Link href="/second-page">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Goto Second Page</a>
          </Link>
          <Link href="/dynamic">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Goto Dynamic Page</a>
          </Link>
        </main>
      </DefaultLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage); // eslint-disable-line react-redux/prefer-separate-component-file
