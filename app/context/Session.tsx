import AuthenticationService from 'app/services/AuthenticationService';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ISession } from '../types';

interface ISessionStateContext {
  session: ISession;
  setSession: Dispatch<any>;
  logout: () => void;
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
const initialState = {
  isLoggedIn: false,
  firstName: '',
  lastName: '',
  email: '',
  basketId: '',
};

const SessionStateProvider: FunctionComponent = ({ children }) => {
  const [session, setSession] = useState<ISession>(initialState);

  const logout = useCallback(async () => {
    const responseData = await AuthenticationService.logout();
    if (!responseData.error) setSession(initialState);
  }, []);

  const value: ISessionStateContext = {
    session,
    setSession,
    logout,
  };

  useEffect(() => {
    AuthenticationService.verifyActiveSession()
      .then((result) => {
        if (!result.error) {
          setSession(result.session);
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
