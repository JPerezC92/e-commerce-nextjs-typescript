import AuthenticationService from 'app/services/AuthenticationService';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import useInputValues, { IInputValuesHook } from './useInputValues';

export interface ISignupInputState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type handleSubmit = (event: FormEvent<HTMLFormElement>) => void;

interface ISignupHook extends IInputValuesHook<ISignupInputState> {
  handleSubmit: handleSubmit;
  errorMessage: string;
}

type TSignupHook = () => ISignupHook;

const useSignup: TSignupHook = () => {
  const { inputValues, handleOnChange } = useInputValues<ISignupInputState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [_isMounted, setIsMounted] = useState(true);

  const router = useRouter();

  const handleSubmit: handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await AuthenticationService.signup(inputValues);

    if (responseData.error && _isMounted) {
      setErrorMessage(responseData.message);
    } else {
      router.push('/login');
    }
  };

  useEffect(
    () => () => {
      setIsMounted(false);
    },
    []
  );

  return { handleOnChange, inputValues, handleSubmit, errorMessage };
};

export default useSignup;
