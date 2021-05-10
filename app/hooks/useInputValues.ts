import { useState } from 'react';

type handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface IInputValuesHook<T> {
  inputValues: T;
  handleOnChange: handleOnChange;
}

type TInputValuesHook = <T>(initialState: T) => IInputValuesHook<T>;

const useInputValues: TInputValuesHook = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleOnChange: handleOnChange = (event) => {
    const { value, name } = event.currentTarget;
    setValues((state) => ({ ...state, [name]: value }));
  };

  return { inputValues: values, handleOnChange };
};

export default useInputValues;
