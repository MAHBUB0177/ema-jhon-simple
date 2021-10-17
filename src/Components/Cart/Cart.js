import React from 'react';
import './Cart.css'

const Cart = (props) => {
  let cart = props.cart;
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
    total = total + product.price;

  }

  let shipping = 0;
  if (total > 35) {
    shipping = 0
  }
  else if (total > 15) {
    shipping = 4.99;
  }
  else if (total > 0) {
    shipping = 12.99;
  }

  const tax = total / 10;

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return (Number(precision))
  }
  return (
    <div className="cart">
      <h1 className="bg-success">Order Summary</h1>
      <h4>Items Order:{cart.length}</h4>
      <p>Product price:{formatNumber(total)}</p>
      <p>Shipping Cost:{formatNumber(shipping)}</p>
      <p>Tax & Vat:{formatNumber(tax)}</p>
      <p> Total Price:{formatNumber(total + shipping + tax)}</p>
      
      <button className="main">Order Review</button>
    </div>
  );
};

export default Cart;