import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { IProduct } from '@/types/*';
import { Button, Modal } from '@material-ui/core';
import { AddCircleOutlineOutlined, Delete } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import accounting from 'accounting';
import baseUrl from 'app/utils/baseUrl';
import useBasket from 'app/hooks/useBasket';

interface IProductDetailsScreen {
  children?: ReactNode;
  product: IProduct;
}

const ProductDetailsScreen = ({ product }: IProductDetailsScreen): JSX.Element => {
  const { _id, description, mediaUrl, name, price, rating } = product;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDeleteProduct = async () => {
    const result = await fetch(`${baseUrl}api/product/${_id}`, {
      method: 'DELETE',
    });

    await result.json();

    router.push('/');
  };

  const basketHook = useBasket();

  return (
    <>
      <div className="product">
        <div className="product__image">
          <Image src={mediaUrl} width="400" height="250" layout="responsive" objectFit="cover" />
        </div>
        <div className="product__info">
          <h2>{name}</h2>
          <span>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              value={rating}
              readOnly
            />
          </span>
          <h1>{accounting.formatMoney(price, 'S/')}</h1>

          <div className="product__actions">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutlineOutlined />}
              onClick={() => basketHook.handleAdd({ _id, mediaUrl, name, price })}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={handleOpen}
            >
              DELETE
            </Button>
          </div>
          <p>{description}</p>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal__wrapper">
            <div className="modal">
              <h2 id="simple-modal-title">{name}</h2>
              <p id="simple-modal-description">
                Sure you want to remove this item from shoppin cart?
              </p>

              <div className="modal__actions">
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Delete />}
                  onClick={handleDeleteProduct}
                >
                  Yes, please
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <style jsx>{`
        .product {
          border-radius: 1rem;
          border: 2px solid #00000050;
          column-gap: 1rem;
          display: flex;
          flex-direction: column;
          margin: auto;
          max-width: 50rem;
          padding: 1rem;
          width: 100%;
        }

        .product__image {
          width: 100%;
        }

        .product__info {
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 1rem;
        }
        .product__actions {
          display: flex;
          column-gap: 1rem;
        }

        .modal__wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .modal {
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
          padding: 3rem;
          border-radius: 0.5rem;
        }

        .modal__actions {
          display: flex;
          justify-content: center;
          column-gap: 1rem;
        }

        @media screen and (min-width: 720px) {
          .product {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
};

export default ProductDetailsScreen;
