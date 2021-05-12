import useSignup from 'app/hooks/useSignup';

const SignupScreen = (): JSX.Element => {
  const signupHook = useSignup();
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = signupHook.inputValues;

  return (
    <>
      <div className="signup">
        <div>
          {signupHook.errorMessage.length > 0 && (
            <div>{signupHook.errorMessage}</div>
          )}
        </div>

        <h1 className="signup__title">Sign up </h1>

        <form onSubmit={signupHook.handleSubmit} className="signup__form">
          <label htmlFor="firstName">
            First name
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
            Last name
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

          <button type="submit">Register</button>
        </form>
      </div>

      <style jsx>{`
        .signup {
          display: flex;
          flex-direction: column;
          max-width: 25rem;
          margin: auto;
        }

        .signup__title {
          margin: 1rem 0;
        }

        .signup__form {
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
        }

        .signup__form > label {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default SignupScreen;
