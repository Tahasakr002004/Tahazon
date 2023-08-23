import React from 'react'
import style from '../cssModules/checkout.module.css'
import CheckoutProduct from './CheckoutProduct';
import checkoutImg from '../images/checkoutAd.jpg';
import { useAuth } from '../context/globalState';
import Subtotal from './Subtotal';


function Checkout() {
  
  const { user, basket } = useAuth();
  
  
  
  
  return (
    <div className={style.checkout}>
      <div className={style['checkout-left']}>
        <img className={style['checkout-ad']} src={checkoutImg} alt="chechout-img" />
        <div>
            <h2>Hello,{user?.email}</h2>
            <h3 className={style['checkout-title']}>Your Shopping Basket</h3>
          {
            basket.length > 0 ? 
              (
                basket.map( ( item ) => 
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                    rating={item.rating}
                    hiddenButton={true}
                />)
              )
              : (
                <p>You have no items in your basket.To buy one or more items,
                  go the home page and add to basket</p>
              )
            }
        </div>
      </div>
      {basket.length > 0 ?
        (
          <div className={style['checkout-right']}>
            <Subtotal/>
          </div>
        )
        : ''
      }
      
    </div>
  )
}

export default Checkout;