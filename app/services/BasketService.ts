import { IBasketProduct, IBasketResponse } from '../types';
import apiConnect from 'app/utils/apiConnect';

export default {
  getById: async (basketId: string): Promise<IBasketResponse> => {
    const result = await apiConnect({ input: `baskets/${basketId}` });
    const data = <IBasketResponse>await result.json();
    return data;
  },

  updateBasket: async (
    basketId: string,
    newBasketProducstState: IBasketProduct[]
  ): Promise<IBasketResponse> => {
    const result = await apiConnect({
      input: `baskets/${basketId}`,
      init: {
        method: 'POST',
        body: JSON.stringify({ basketProducts: newBasketProducstState }),
        headers: { 'Content-Type': 'application/json' },
      },
    });

    const data = <IBasketResponse>await result.json();
    return data;
  },
};
