import useSignup from 'app/hooks/useSignup';

const SignupScreen = (): JSX.Element => {
  const signupHook = useSignup();
  const { firstName, lastName, email, password, confirmPassword } = signupHook.inputValues;

  return (
    <>
      <div>{signupHook.errorMessage.length > 0 && <div>{signupHook.errorMessage}</div>}</div>

      <form onSubmit={signupHook.handleSubmit}>
        <label htmlFor="firstName">
          Firstname
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
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
            required
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
            required
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
            required
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
            required
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
