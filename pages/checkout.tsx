import CheckoutScreen from '@/components/Pages/CheckoutScreen';
import Head from 'next/head';
import { APP_NAME } from 'app/utils/constants';
import { FunctionComponent } from 'react';

const Checkout: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Checkout</title>
      </Head>
      <CheckoutScreen />
    </>
  );
};

export default Checkout;
