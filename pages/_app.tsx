import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { BasketStateProvider } from 'app/context/Basket';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <BasketStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BasketStateProvider>
  );
};

export default MyApp;
