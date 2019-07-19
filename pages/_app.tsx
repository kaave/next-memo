import React from 'react';
import App, { Container, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { ThemeProvider } from 'styled-components';

import { Store } from '~/redux';
import { configureStore } from '~/redux/store';

type Props = { store: Store };
type State = {};

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

class ModifiedApp extends App<Props, State> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(ModifiedApp));
