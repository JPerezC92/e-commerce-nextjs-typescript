import CheckoutScreen from '@/components/Pages/CheckoutScreen';
import { APP_NAME } from 'app/utils/constants';
import Head from 'next/head';
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
