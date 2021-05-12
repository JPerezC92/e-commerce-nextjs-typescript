import apiConnect from 'app/utils/apiConnect';
import { ISignupInputState } from 'app/hooks/useSignup';
import { IResponse, ISession } from '../types';
import { ILoginInputState } from 'app/hooks/useLogin';

interface ILoginResponse extends IResponse {
  session: ISession;
}

interface IVerifyActiveSession extends IResponse {
  session: ISession;
}

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

  login: async (values: ILoginInputState): Promise<ILoginResponse> => {
    const result = await apiConnect({
      input: 'login',
      init: {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      },
    });

    const data = await result.json();
    return data;
  },

  verifyActiveSession: async (): Promise<IVerifyActiveSession> => {
    const result = await apiConnect({ input: 'session' });
    const data = await result.json();
    return data;
  },

  logout: async (): Promise<IResponse> => {
    const result = await apiConnect({
      input: 'logout',
      init: { method: 'DELETE' },
    });
    const data = await result.json();
    return data;
  },
};
