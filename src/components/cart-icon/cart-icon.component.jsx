import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from './../../images/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';
import { CartItemContainer, ItemCount, ImageShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleCartDropDown = () => setIsCartOpen(!isCartOpen);

  return (
    <CartItemContainer onClick={toggleCartDropDown}>
      <ImageShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
  );
};

export default CartIcon;
