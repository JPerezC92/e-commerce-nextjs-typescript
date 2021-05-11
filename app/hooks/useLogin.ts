import AuthenticationService from 'app/services/AuthenticationService';
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
  const [errorMessage, setErrorMessage] = useState('');
  const { inputValues, handleOnChange } = useInputValues<ILoginInputState>({
    email: '',
    password: '',
  });

  const handleSubmit: THandleSubmit = async (event) => {
    event.preventDefault();
    const responseData = await AuthenticationService.login(inputValues);
    if (responseData.error) setErrorMessage(responseData.message);

    console.log(responseData.session);
  };

  return { inputValues, handleOnChange, handleSubmit, errorMessage };
};

export default useLogin;
