import React from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import  './Shop.css'


const Shop = () => {

   const first10=fakeData.slice(0,10);
   var [products,setProduct] =useState(first10);
   const [cart,setCart] =useState([]);

   const handelAddProduct = (product)=>{
    //  console.log("clicked",product)
     const newCart=[...cart,product];
     setCart(newCart)
   }
 return (
  <div className="shop-container">
   <div className="product-container">
  {
   products.map(pd=> <Product product={pd}
    handelAddProduct={handelAddProduct} />)
  }
   </div>
   <div className="cart-container">
    <Cart cart={cart}/>
   </div>
  
 
  </div>
 );
};

export default Shop;