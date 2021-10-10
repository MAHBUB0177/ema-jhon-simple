import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [nyoks, setNyoks] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setNyoks(data))

  }, [])

  // const nyoks=['shakib','salman','shahrukh','akshay','ranbir']
  const product = [
    { name: " phone", price: 8000 },
    { name: "laptop", price: 35000 },
    { name: "refrigaretor", price: 40000 },
    { name: "Air-phone", price: 400 },
    { name: "Camera", price: 30000 },

  ]



  var ulStyle = {
    backgroundColor: 'orange',
    borderRadious: '10px',
    textAlign: 'center'
  }
  return (
    <div >
      <h1 style={{ textAlign: 'center',backgroundColor:'gray' }}>MY REACT APP</h1>
      {/* <Product name={product[0].name} price={product[0].price} /> */}
      <ul style={ulStyle} >
        {
          nyoks.map(nyok => <li>{nyok.name}</li>)
        }
        {
          product.map(products => <li>{products.name}</li>)
        }

      </ul>
      <Counter />
      {
        product.map(products =>
          <Product products={products} />)
      }

      {
        nyoks.map(noyok =>
          <Dynamically user={noyok} />)
      }

      {/* <Product products={product[0]} />
      <Product products={product[1]} />
      <Product products={product[2]} /> */}


    </div>
  );
}

function Dynamically(props) {
  var style = {
    border: '1px solid gray',
    textAlign:'center',
    margin:'10px',
    pading:'5px'

  }
  const { name, address } = props.user;
  return (
    <div style={style}>
      <h1>name:{name}</h1>
      <h4>title:{address.street}</h4>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);
  const handelCount = () => {
    setCount(count + 1)
  }
  console.log(count)
  var btnStyle = {
    border: "1px solid gray",
    backgroundColor: "gray",
    borderRadious: "5px",
    textAlign: "center"


  }
  return (

    <div style={btnStyle}>
      <button onClick={handelCount} >ADD MOVIE</button>
      <h1>NUMBER OF MOVIE:{count}</h1>

    </div>
  )
}

function Product(props) {

  var productStyle = {
    border: "1px solid gray",
    backgroundColor: "tomato",
    borderRadious: "5px",
    height: '200px',
    width: "265px",
    float: "left",
    textAlign: "center"

  }

  const { name, price } = props.products;//object destructure
  return (
    <div className="container" style={{ backgroundColor: "salmon" }}  >
      <div style={productStyle}>
        {/* <h1> {props.products.name}</h1> */}
        <h1>{name}</h1>
        <h4>{price}</h4>

        <button style={{ color: "success" }}>Buy Now</button>
      </div>


    </div>
  )

}

export default App;
