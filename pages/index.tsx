import Head from 'next/head';
import { GetStaticProps } from 'next';

import { IProductsReqResponse } from '@/types/*';
import connectDB from 'db/connectDB';
import Products from 'db/models/Products';
import HomeScreen from '@/components/Pages/HomeScreen';

const Home = ({ error, payload: products }: IProductsReqResponse): JSX.Element => {
  if (error) return <div>Estamos experimentando problemas tecnicos</div>;

  return (
    <>
      <Head>
        <title>Shoes Shop</title>
      </Head>

      <HomeScreen products={products} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    await connectDB();
    const result = await Products.find();
    const data = JSON.stringify(result);

    return {
      props: {
        error: false,
        payload: JSON.parse(data),
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
        message: error.message,
      },
    };
  }
};

export default Home;
