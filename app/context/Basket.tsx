import BasketService from 'app/services/BasketService';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IBasketProduct } from '../types';
import { useSessionState } from './Session';

interface IBasketStateContext {
  basketProducts: IBasketProduct[];
  setBasketProducts: Dispatch<SetStateAction<any[]>>;
  totalItemsQuantity: number;
  totalCost: number;
}

const BasketStateContext = createContext({} as IBasketStateContext);

const useBasketState = (): IBasketStateContext => {
  const context = useContext(BasketStateContext);
  if (!context)
    throw new Error('useBasketState must be used within a BasketStateContext');
  return context;
};

const totalItemsQuantityAndTotalCost = (basketProducts: IBasketProduct[]) =>
  basketProducts.reduce(
    (acum, { quantity, price }) => ({
      totalItemsQuantity: acum.totalItemsQuantity + quantity,
      totalCost: acum.totalCost + price * quantity,
    }),
    { totalItemsQuantity: 0, totalCost: 0 }
  );

const BasketStateProvider: FunctionComponent = ({ children }) => {
  // const basketId = '608debb581d6a16540948074';
  const { session } = useSessionState();
  const [basketProducts, setBasketProducts] = useState([] as IBasketProduct[]);

  const { totalItemsQuantity, totalCost } = useMemo(
    () => totalItemsQuantityAndTotalCost(basketProducts),
    [basketProducts]
  );

  useEffect(() => {
    if (session.isLoggedIn) {
      BasketService.getById(session.basketId).then((data) => {
        if (!data.error) setBasketProducts(data.payload.items);
      });
    }
  }, [session.isLoggedIn]);

  const value: IBasketStateContext = {
    basketProducts,
    setBasketProducts,
    totalItemsQuantity,
    totalCost,
  };

  return (
    <BasketStateContext.Provider value={value}>
      {children}
    </BasketStateContext.Provider>
  );
};

export { BasketStateProvider, useBasketState };
