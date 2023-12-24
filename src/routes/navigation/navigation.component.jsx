import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../images/crown.svg';

import { UserContext } from '../../contexts/user.context';
import { signOutCurrentUser } from '../../utils/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutCurrentUser();
    setCurrentUser(null);
  };

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
            <Link className='nav-link' onClick={handleSignOut} to='/'>
              Sign out
            </Link>
          ) : (
            <Link className='nav-link' to='/auth'>
              Sign in
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
