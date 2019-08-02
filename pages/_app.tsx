import React from 'react';
import App, { Container, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { PageTransition } from 'next-page-transitions';

import '~/styles/_global.scss?raw';
import { Store } from '~/redux';
import { configureStore } from '~/redux/store';

type Props = { store: Store };
type State = {};

class ModifiedApp extends App<Props, State> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} key={router.route} />
          </PageTransition>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(ModifiedApp);
