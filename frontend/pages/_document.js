// Like the _app.js file, this _document.js file is used in this way since this is a special component and in this case
// can give access to even the page <head>

import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        {/* <Head></Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
