import AuthenticationService from 'app/services/AuthenticationService';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ISession } from '../types';

interface ISessionStateContext {
  session: ISession;
  setSession: Dispatch<any>;
}

const SessionStateContext = createContext<ISessionStateContext | null>(null);

const useSessionState = (): ISessionStateContext => {
  const context = useContext(SessionStateContext);
  if (!context)
    throw new Error(
      'useSessionState must be used within a SessionStateContext'
    );
  return context;
};

const SessionStateProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState<ISession>({
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    basketId: '',
  });

  const value: ISessionStateContext = { session, setSession };

  useEffect(() => {
    AuthenticationService.verifyActiveSession()
      .then((result) => {
        if (!result.error) {
          setSession(result.session);
        } else {
          console.log(result.message);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <SessionStateContext.Provider value={value}>
      {children}
    </SessionStateContext.Provider>
  );
};

export { SessionStateProvider, useSessionState };
