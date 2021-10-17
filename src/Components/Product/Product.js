import React from 'react';
import './Product.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
 console.log(props.product)
 const {name,img,seller,price,stock}=props.product;
 return (
  <div className="product">
  <div className="img">
   <img src={img}  alt="" />

  </div>
  <div className="product-name">
   <h1 style={{fontSize:'25px'}}>{name}</h1>
   <br/>
  
   <h2 style={{color:"black",fontSize:'20px'}}>BY:{seller}</h2>
   <h2 style={{color:"black",fontSize:'20px'}}> price:{price}</h2>
   
   <h2 style={{color:"black",fontSize:'20px'}}>Only:{stock}</h2>
 
   
   <button className="main-button"
   onClick={() =>props.handelAddProduct(props.product)}
   ><FontAwesomeIcon icon={faShoppingCart} />
   add to curt</button>


  </div>
  </div>
  
 )
};

export default Product;