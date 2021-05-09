import { IProduct } from '@/types/*';
import useBasket from 'app/hooks/useBasket';
import ProductCard from './ProductCard';

const HomeScreen = ({ products }: { products: IProduct[] }): JSX.Element => {
  const basketHook = useBasket();
  return (
    <>
      <section className="products">
        <h1 className="products__title">Products</h1>
        <ul className="products__grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} basketHook={basketHook} />
          ))}
        </ul>
      </section>
      <style jsx>{`
        .products {
          padding: 2rem 1rem;
          max-width: 1500px;
          align-self: center;
          width: 100%;
        }

        .products__title {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .products__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
          column-gap: 1rem;
          row-gap: 1rem;
          margin: auto;
        }
      `}</style>
    </>
  );
};

export default HomeScreen;
