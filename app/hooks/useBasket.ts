import { useBasketState } from 'app/context/Basket';
import { useSessionState } from 'app/context/Session';
import BasketService from 'app/services/BasketService';
import { IBasketProduct } from '../types';

type handleAdd = (basketProduct: IBasketProduct) => Promise<void>;
type handleDelete = (basketProductId: string) => Promise<void>;

export interface IBasketHook {
  handleAdd: handleAdd;
  handleDelete: handleDelete;
}

type TBasketHook = () => IBasketHook;

const useBasket: TBasketHook = () => {
  const {
    session: { basketId },
  } = useSessionState();
  const { basketProducts, setBasketProducts } = useBasketState();

  const handleAdd: handleAdd = async (basketProduct) => {
    if (isNaN(basketProduct.quantity)) basketProduct.quantity = 1;

    const basketProductExists = basketProducts.some(
      ({ _id }) => _id === basketProduct._id
    );
    let newBasketProducstState: IBasketProduct[];

    if (!basketProductExists) {
      newBasketProducstState = [...basketProducts, basketProduct];
    } else {
      newBasketProducstState = [
        ...basketProducts.map((bp) =>
          bp._id === basketProduct._id
            ? { ...bp, quantity: bp.quantity + 1 }
            : bp
        ),
      ];
    }

    const responseData = await BasketService.updateBasket(
      basketId,
      newBasketProducstState
    );

    if (!responseData.error) setBasketProducts(newBasketProducstState);
  };

  const handleDelete: handleDelete = async (basketProductId) => {
    const newBasketProducstState = basketProducts.filter(
      ({ _id }) => _id !== basketProductId
    );
    const responseData = await BasketService.updateBasket(
      basketId,
      newBasketProducstState
    );
    if (!responseData.error) setBasketProducts(newBasketProducstState);
  };

  return { handleAdd, handleDelete };
};

export default useBasket;
