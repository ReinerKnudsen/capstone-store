// Over our application we will get three different button tpes:
// - default button (black, turns white on hover)
// - inverted button (white, turns black on hover)
// - google-sign-in (blue)Def

import { DefaultButton, GoogleButton, InvertedButton } from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
  default: 'default',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.default) =>
  ({
    [BUTTON_TYPE_CLASSES.default]: DefaultButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

function Button({ children, buttonType, ...buttonOptions }) {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...buttonOptions}>{children}</CustomButton>;
}

export default Button;
