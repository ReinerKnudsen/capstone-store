import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../images/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropwdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutCurrentUser } from '../../utils/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {currentUser ? (
            <Link className='nav-link' onClick={signOutCurrentUser} to='/'>
              Sign out
            </Link>
          ) : (
            <Link className='nav-link' to='/auth'>
              Sign in
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropwdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
