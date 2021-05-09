import { ReactNode } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <Navbar />

      <main className="mainContent">{children}</main>

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
