/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// The _app.js file is used in this way since this is a special component and in this case
// can give access to even the page <head>

import { ApolloProvider } from '@apollo/client';

import Router from 'next/router';

// Nprogress is the packaged used to add loading bars when changing pages
import Nprogress from 'nprogress';
// import 'nprogress/nprogress.css'; - NProgress default CSS
import '../components/styles/nprogress.css';

import '../components/styles/miscStyles.css';

import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

import Page from '../components/Page';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

// export default function MyApp({ Component, pageProps, apollo }) {
function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

// Async method specific to Next.js
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
