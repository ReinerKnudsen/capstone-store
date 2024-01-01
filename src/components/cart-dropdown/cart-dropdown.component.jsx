import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import { CartItems, CartDropdownContainer, EmptyMessage } from './cart-dropdown.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropwdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const closeCartDropDown = () => {
    setIsCartOpen(!isCartOpen);
  };

  const goToCheckoutHandler = () => {
    closeCartDropDown();
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty.</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.default} onClick={goToCheckoutHandler}>
        Go to checkout
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropwdown;
