import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import useNavbarVisibility from '../hooks/useNavbarVisibility';
import { useBasketState } from 'app/context/Basket';
import { useSessionState } from 'app/context/Session';

const Navbar = (): JSX.Element => {
  const { session, logout } = useSessionState();
  const { isVisible } = useNavbarVisibility();
  const { totalItemsQuantity } = useBasketState();

  return (
    <header className={`${isVisible && 'header--hidden'}`}>
      <Link href="/">
        <a>
          <Image
            src="/images/logo.png"
            width="100"
            height="100"
            objectFit="contain"
            objectPosition="center"
          />
        </a>
      </Link>

      <ul>
        {session.isLoggedIn && <li>Hello {session.firstName}</li>}
        <li>
          <Link href="/checkout">
            <a>
              <Badge badgeContent={totalItemsQuantity} color="secondary">
                <AddShoppingCart />
              </Badge>
            </a>
          </Link>
        </li>

        {!session.isLoggedIn ? (
          <>
            <li>
              <Link href="/login">
                <a className="nav__link">Login</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a className="nav__link">Signup</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button type="button" onClick={logout} title="Logout">
              <ExitToAppOutlinedIcon
                style={{ color: '#fff', backgroundColor: '#000' }}
              />
            </button>
          </li>
        )}
      </ul>
      <style jsx>{`
        header {
          padding: 0 2%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #000000;
          color: #f8f8f8;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 1;
          transition: all 0.3s ease-in-out;
        }

        .header--hidden {
          top: -50rem;
        }

        ul {
          display: flex;
          column-gap: 2rem;
        }
        .nav__link {
          padding: 1rem 0;
          transition: all 0.5s ease-in-out;
        }
        .nav__link:hover {
          border-bottom: 1px solid #fec200;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
