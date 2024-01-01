import styled from 'styled-components';
import { GoogleButton, InvertedButton, DefaultButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${GoogleButton},
  ${InvertedButton},
  ${DefaultButton} {
    margin-top: auto;
    font-size: 0.8rem;
  }

  /*  instead of importing an adressing the specific button components, in our case 
      we could also follow the more generic approach:
  button {
    margin-top: auto;
    font-size: 0.8rem;
  } */
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 100px auto;
`;
