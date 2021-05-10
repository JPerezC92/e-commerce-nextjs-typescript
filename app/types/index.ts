import { NextApiRequest, NextApiResponse } from 'next';
import { ReactNode } from 'react';
/*
================================
Models
================================
 */

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  mediaUrl: string;
  rating: number;
}

export interface IBasketProduct {
  _id: string;
  name: string;
  price: number;
  mediaUrl: string;
  quantity?: number;
}

export interface IBasket {
  _id: string;
  items: IBasketProduct[];
}

/*
================================
Screen props
================================
*/

export interface IProductsDetailsProps extends IProductReqResponse {
  children: ReactNode;
}

/*
================================
Api Request
================================
*/
export type FunctionRequest = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export interface IBasketReq {
  basketProducts: IBasketProduct[];
}

/*
================================
Api Response
================================
*/

export interface IResponse {
  error: boolean;
  message?: string;
}

export interface IProductsReqResponse extends IResponse {
  payload: IProduct[];
}

export interface IProductReqResponse extends IResponse {
  payload: IProduct;
}

export interface IBasketResponse extends IResponse {
  payload: IBasket;
}
