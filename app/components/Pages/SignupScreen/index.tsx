import useSignup from 'app/hooks/useSignup';

const SignupScreen = (): JSX.Element => {
  const signupHook = useSignup();
  const { firstName, lastName, email, password, confirmPassword } = signupHook.inputValues;

  return (
    <>
      <div>{signupHook.errorMessagge.length > 0 && <div>{signupHook.errorMessagge}</div>}</div>

      <form onSubmit={signupHook.handleSubmit}>
        <label htmlFor="firstName">
          Firstname
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={signupHook.handleOnChange}
            value={firstName}
          />
        </label>

        <label htmlFor="lastName">
          Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={signupHook.handleOnChange}
            value={lastName}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            onChange={signupHook.handleOnChange}
            value={email}
          />
        </label>

        <label htmlFor="Password">
          Password
          <input
            type="text"
            name="password"
            id="password"
            onChange={signupHook.handleOnChange}
            value={password}
          />
        </label>

        <label htmlFor="Confirm Password">
          Confirm Password
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            onChange={signupHook.handleOnChange}
            value={confirmPassword}
          />
        </label>

        <pre>{JSON.stringify(signupHook.inputValues)}</pre>

        <button type="submit">Register</button>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default SignupScreen;
