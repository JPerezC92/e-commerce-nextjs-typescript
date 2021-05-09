import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Rating } from '@material-ui/lab';

import { IProduct } from '@/types/*';
import accounting from 'accounting';
import type { IBasketHook } from 'app/hooks/useBasket';

interface IProductCard {
  product: IProduct;
  basketHook: IBasketHook;
}

const ProductCard = ({ product, basketHook }: IProductCard) => {
  const { _id, description, mediaUrl, name, price, rating } = product;

  return (
    <>
      <li className="product__item">
        <Image src={mediaUrl} width="100" height="80" layout="responsive" objectFit="cover" />

        <span className="product__price">{accounting.formatMoney(price, 'S/')}</span>
        <Rating
          style={{ alignSelf: 'center', marginTop: '1rem' }}
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          value={rating}
        />
        <div className="card__content">
          <Link href="/product/[id]" as={`/product/${_id}`}>
            <a className="product__name">{name}</a>
          </Link>
          <p>{description}</p>

          <button
            type="button"
            className="card__button"
            onClick={() => basketHook.handleAdd({ _id, mediaUrl, name, price })}
          >
            Añadir
          </button>
        </div>
      </li>

      <style jsx>{`
        .product__item {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 0 4px #00000050;
          transition: all 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .product__item:hover {
          box-shadow: 0px 0px 14px 3px #00000070;
        }

        .product__name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .product__name:hover {
          color: #fa3c84;
          text-decoration: underline;
        }

        .product__price {
          position: absolute;
          background-color: #00000080;
          color: #f8f8f8;
          right: 0;
          border-bottom-left-radius: 1rem;
          font-size: 1.1rem;
          padding: 0.2rem 0.5rem;
          font-weight: 600;
        }

        .card__content {
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
          margin: 1rem 0;
          flex: 1;
        }

        .card__button {
          cursor: pointer;
          background-color: transparent;
          border: none;
          margin-top: 1rem;
          text-align: center;
          height: auto;
          width: 100%;
          padding: 0.5rem 2rem;
          overflow: hidden;
          font-size: 1rem;
          box-shadow: 0 0 5px #01d3e9;
          border-radius: 2rem;
          font-weight: bold;
          transition: all 0.3s ease-in-out;
        }

        .card__button:hover {
          color: #f8f8f8;
          background-color: rgb(5, 212, 221);
        }
      `}</style>
    </>
  );
};

export default memo(ProductCard);
