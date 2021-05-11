import useLogin from 'app/hooks/useLogin';

const LoginScreen = (): JSX.Element => {
  const loginHook = useLogin();
  const { email, password } = loginHook.inputValues;

  return (
    <>
      <div>
        <div>{loginHook.errorMessage.length > 0 && <div>{loginHook.errorMessage}</div>}</div>
        <form onSubmit={loginHook.handleSubmit}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={loginHook.handleOnChange}
              value={email}
            />
          </label>

          <label htmlFor="Password">
            Password
            <input
              type="text"
              name="password"
              id="password"
              required
              onChange={loginHook.handleOnChange}
              value={password}
            />
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
