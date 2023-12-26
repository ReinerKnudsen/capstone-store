import './card-dropdown.styles.scss';
import Button from '../button/button.component';

const CardDropwdown = () => {
  return (
    <div className='cart-dropdown-container'>
      <div className='card-items' />
      <Button buttonType='default'>Go to checkout</Button>
    </div>
  );
};

export default CardDropwdown;
