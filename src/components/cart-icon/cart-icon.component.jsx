import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from './../../images/shopping-bag.svg';

import { CartContext } from '../../contexts/card.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleCartDropDown = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={toggleCartDropDown}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;
