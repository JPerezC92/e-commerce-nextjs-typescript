import baseUrl from './baseUrl';
import fetch from 'isomorphic-fetch';

interface IConfig {
  input: RequestInfo;
  init?: RequestInit;
}

const baseApiURL = `${baseUrl}api/`;

const apiConnect: (config: IConfig) => Promise<Response> = async ({ input, init }) => {
  const result = await fetch(typeof input === 'string' ? `${baseApiURL}${input}` : input, init);
  return result;
};

export default apiConnect;
