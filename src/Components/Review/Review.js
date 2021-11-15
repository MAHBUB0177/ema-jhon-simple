import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';

import ReviewDetails from '../ReviewDetails/ReviewDetails';

const Review = () => {
 const [Cart,setCart]=useState([])

 useEffect( ()=>{
  const saveCart = getDatabaseCart()
  const productkeys=Object.keys(saveCart)
  // console.log(productkeys)
  
  const cartProduct=productkeys.map(key => {
   const product=fakeData.find(pd =>(pd.key === key));
   // console.log(product)
   product.quantity=saveCart[key]
   return product;
  });
  setCart(cartProduct)


 },[]
 
 )

 return (
  <div>
   
   {
    Cart.map(product=> <ReviewDetails product={product} />)
   }
  </div>
 )
}

export default Review