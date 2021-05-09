import React, { Fragment, FunctionComponent } from 'react';
import Image from 'next/image';
import { useBasketState } from 'app/context/Basket';
import accounting from 'accounting';
import useBasket from 'app/hooks/useBasket';

const CheckoutScreen: FunctionComponent = () => {
  const basketState = useBasketState();
  const basketHook = useBasket();

  return (
    <>
      <div className="checkout">
        <h2 className="checkout__title">Checkout</h2>
        <div className="checkout__grid">
          <span className="grid__header">Item</span>
          <span className="grid__header">Quantity</span>
          <span className="grid__header">Price</span>
          <span className="grid__header">Subtotal</span>
          {basketState.basketProducts.map((basketProduct) => (
            <Fragment key={basketProduct._id}>
              <span className="gridItem__detail">
                <span className="detail__image">
                  <Image
                    src={basketProduct.mediaUrl}
                    width="300"
                    height="250"
                    objectFit="cover"
                    layout="responsive"
                  />
                </span>
                <span className="detail__info">
                  {basketProduct.name}
                  <button type="button" onClick={() => basketHook.handleDelete(basketProduct._id)}>
                    Delete
                  </button>
                </span>
              </span>
              <span>{basketProduct.quantity}</span>
              <span>{accounting.formatMoney(basketProduct.price, 'S/')}</span>
              <span>
                {accounting.formatMoney(basketProduct.quantity * basketProduct.price, 'S/')}
              </span>
            </Fragment>
          ))}
          <span className="grid__footer"></span>
          <span className="grid__footer"></span>
          <span className="grid__footer">Total</span>
          <span className="grid__footer">
            {accounting.formatMoney(basketState.totalCost, 'S/')}
          </span>
        </div>
      </div>

      <style jsx>{`
        .checkout {
          padding: 2.5rem 1rem;
        }

        .checkout__title {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .checkout__grid {
          margin: auto;
          max-width: 90vw;
          overflow-x: scroll;
          display: grid;
          grid-template-columns: auto 20rem auto auto;
          place-items: center;
          // align-items: center;
          row-gap: 1rem;
        }

        .grid__header,
        .grid__footer {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .gridItem__detail {
          place-self: normal;
          display: grid;
          // background-color: red;
          grid-template-columns: 0.5fr 0.5fr;
          column-gap: 1rem;
        }

        .detail__image {
          max-width: 10rem;
        }

        .detail__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          row-gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default CheckoutScreen;
