import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { IProductsDetailsProps } from '@/types/*';
import connectDB from 'db/connectDB';
import Products from 'db/models/Products';
import { APP_NAME } from 'app/utils/constants';
import ProductDetailsScreen from '@/components/Pages/ProductDetailsScreen';

const ProductDetails = ({ error, payload: product }: IProductsDetailsProps): JSX.Element => {
  const { isFallback } = useRouter();

  if (error) return <div>El articulo no se encuentra disponible</div>;

  if (isFallback) return <div>Cargando</div>;

  return (
    <>
      <Head>
        <title>
          {APP_NAME} | {product?.name}
        </title>
      </Head>

      <ProductDetailsScreen product={product} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    connectDB();
    const id = params?.id as string;

    const result = await Products.findOne({ _id: id });
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '608f3ca0166fce8c970b5fd7' } }],
    fallback: true,
  };
};
export default ProductDetails;
