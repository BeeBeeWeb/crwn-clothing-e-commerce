import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import CartProvider from './providers/cart/cart.provider';

import './index.css';

ReactDOM.render(
  <CartProvider>
    
      <BrowserRouter>
       
          < App />
        
      </BrowserRouter>
    
  </CartProvider>,
  document.getElementById('root'));