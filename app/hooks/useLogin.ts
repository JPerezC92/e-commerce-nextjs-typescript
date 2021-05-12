import { useSessionState } from 'app/context/Session';
import AuthenticationService from 'app/services/AuthenticationService';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import useInputValues, { IInputValuesHook } from './useInputValues';

export interface ILoginInputState {
  email: string;
  password: string;
}
type THandleSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

interface ILoginHook extends IInputValuesHook<ILoginInputState> {
  handleSubmit: THandleSubmit;
  errorMessage: string;
}

type TLoginHook = () => ILoginHook;

const useLogin: TLoginHook = () => {
  const router = useRouter();
  const { setSession } = useSessionState();

  const [errorMessage, setErrorMessage] = useState('');
  const { inputValues, handleOnChange } = useInputValues<ILoginInputState>({
    email: '',
    password: '',
  });

  const handleSubmit: THandleSubmit = async (event) => {
    event.preventDefault();
    const responseData = await AuthenticationService.login(inputValues);
    if (responseData.error) setErrorMessage(responseData.message);

    setSession(responseData.session);
    router.push('/');
  };

  return { inputValues, handleOnChange, handleSubmit, errorMessage };
};

export default useLogin;
