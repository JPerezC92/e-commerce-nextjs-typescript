import { useSessionState } from 'app/context/Session';
import { ReactNode } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { session } = useSessionState();
  return (
    <>
      <Navbar />

      <main className="mainContent">
        {!session.isLoggedIn && (
          <h2 style={{ textAlign: 'center' }}>
            You are not logged in, the basket will be saved temporarily
          </h2>
        )}
        {children}
      </main>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
        }

        ul {
          list-style-type: none;
        }

        .mainContent {
          max-width: 1500px;
          width: 100%;
          margin: auto;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
};

export default Layout;
