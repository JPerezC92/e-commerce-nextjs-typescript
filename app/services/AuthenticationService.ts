import apiConnect from 'app/utils/apiConnect';
import { ISignupInputState } from 'app/hooks/useSignup';
import { IResponse } from '../types';

// interface ISignupResponse {
//   error: boolean;
//   message: string;
// }

export default {
  signup: async (values: ISignupInputState): Promise<Required<IResponse>> => {
    const result = await apiConnect({
      input: `signup`,
      init: {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      },
    });

    const data = <Required<IResponse>>await result.json();
    return data;
  },

  login: async (): Promise<void> => {
    return;
  },
};
