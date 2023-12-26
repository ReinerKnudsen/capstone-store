import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';
import { CartProvider } from './contexts/card.context';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// The ProductProvider might need access to the user data provided by the UserProvider.
// It therefore needs to live inside the UserProvider
// There is no real need for the UserProvider to have access to the product data.

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
