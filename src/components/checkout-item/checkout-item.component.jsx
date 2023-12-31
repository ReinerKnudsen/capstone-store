import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  CheckoutImageContainer,
  CheckoutImage,
  CheckoutProperty,
  CheckoutQuantity,
  CheckoutValue,
  QuantityArrow,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, clearItemFromCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <CheckoutImageContainer>
        <CheckoutImage src={imageUrl} alt={`${name}`} />
      </CheckoutImageContainer>
      <CheckoutProperty>{name}</CheckoutProperty>
      <CheckoutQuantity>
        <QuantityArrow onClick={removeItemHandler}>&#10094; </QuantityArrow>
        <CheckoutValue>{quantity}</CheckoutValue>
        <QuantityArrow onClick={addItemHandler}>&#10095;</QuantityArrow>
      </CheckoutQuantity>
      <CheckoutProperty>{price}</CheckoutProperty>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
