// The _app.js file is used in this way since this is a special component and in this case
// can give access to even the page <head>
import Page from '../components/Page';

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
