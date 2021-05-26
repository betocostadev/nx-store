/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// The _app.js file is used in this way since this is a special component and in this case
// can give access to even the page <head>

import Router from 'next/router';

// Nprogress is the packaged used to add loading bars when changing pages
import Nprogress from 'nprogress';
// import 'nprogress/nprogress.css'; - NProgress default CSS
import '../components/styles/nprogress.css';

import Page from '../components/Page';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
