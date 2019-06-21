import React from 'react';
import Document, { Html, Head, Main, NextScript, NextDocumentContext } from 'next/document';

import * as configs from '@/utils/configs';

class ModifiedDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script src={`https://polyfill.io/v3/polyfill.min.js?features=${configs.polyfills}&flags=gated`} defer />
        </Head>
        <body>
          Running port at: {process.env.PORT}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ModifiedDocument;
