import useLogin from 'app/hooks/useLogin';

const LoginScreen = (): JSX.Element => {
  const loginHook = useLogin();
  const { email, password } = loginHook.inputValues;

  return (
    <>
      <div className="login">
        {loginHook.errorMessage.length > 0 && (
          <div>{loginHook.errorMessage}</div>
        )}

        <h1 className="login__title">Login</h1>

        <form onSubmit={loginHook.handleSubmit} className="login__form">
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

      <style jsx>{`
        .login {
          display: flex;
          flex-direction: column;
          max-width: 25rem;
          margin: auto;
        }

        .login__title {
          margin: 1rem 0;
        }

        .login__form {
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
        }

        .login__form > label {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default LoginScreen;
