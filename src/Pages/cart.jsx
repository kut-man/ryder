import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Recommended from '../Componets/Recommended'
import Selected from '../Componets/Selected'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'

export default function Cart({ products }) {
  const user = sessionStorage.getItem('loggedIn');
  const cartCollectionRef = collection(db, user);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState([{}]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getSelected = async () => {
      let data = await getDocs(cartCollectionRef);
      setCart(data.docs.map((doc) => ({ ...doc.data() })));
      setSubtotal(data.docs.map((doc) => ({ id: doc.data().id, price: parseInt(doc.data().price), quantity: doc.data().quantity })))
    };
    getSelected();
  }, [])

  useEffect(() => {
    //in case that subtotal is empty
    try {
      let sum = 0
      let quantity = 0
      subtotal.map((obj) => {
        return (sum += obj.price, quantity += obj.quantity)
      })
      setTotalPrice(sum)
      // setNotifyCart(quantity)
    } catch (error) {

    }

  }, [subtotal])

  const style1 = {
    fontFamily: "'Jost', sans-serif"
  }

  const style = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '300px'
  }

  return (

    <div style={style1}>
      {cart.length === 0 ?
        <div style={style}>
          <h3>Your cart is empty</h3>
          <Link to={'/collections'}>Continue shopping</Link>
        </div>
        :
        <>
          <div>
            <div className="grid-container">
              <div className="item1">Your cart</div>
              <div className="item2"><Link to={'/collections'}>Continue shopping</Link></div>
              <div className="item3">PRODUCT</div>
              <div className="item4">PRICE</div>
              <div className="item5">QUANTITY</div>
              <div className="item6">TOTAL:</div>
            </div>
          </div>

          {cart.map((product, index) => {
            return <Selected product={product} setSubtotal={setSubtotal} subtotal={subtotal} />
          })}

          <div className='checkOutContainer'>
            <p style={{ display: 'inline' }}>Subtotal <p style={{ marginLeft: '15px', display: 'inline', fontSize: '20px' }}>${parseInt(totalPrice)}.00 USD</p></p>
            <p style={{ fontSize: '15px', marginTop: '20px' }}>Tax included. Shipping calculated at checkout.</p>
            <button className='checkOutButton'>Check out</button>
          </div>
        </>
      }
      {products.length == 0 ? void(0) : <Recommended products={products} />}
    </div>
  )
}
