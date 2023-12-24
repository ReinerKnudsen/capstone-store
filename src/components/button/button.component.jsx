// Over our application we will get three different button tpes:
// - default button (black, turns white on hover)
// - inverted button (white, turns black on hover)
// - google-sign-in (blue)

// const BUTTON_TYPE_CLASSES = {
//   google: 'google-sign-in',
//   inverted: 'inverted',
// };

import './button.styles.scss';

function Button({ children, buttonType, ...buttonOptions }) {
  return (
    <button className={`button-container ${buttonType}`} {...buttonOptions}>
      {children}
    </button>
  );
}

export default Button;
