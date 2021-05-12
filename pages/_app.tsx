import type { AppProps } from 'next/app';
import { SessionStateProvider } from 'app/context/Session';
import { BasketStateProvider } from 'app/context/Basket';
import Layout from '@/components/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SessionStateProvider>
      <BasketStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BasketStateProvider>
    </SessionStateProvider>
  );
};

export default MyApp;
