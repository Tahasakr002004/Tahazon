import React from 'react'
import style from '../cssModules/order.module.css'
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../context/AppReducer';


function Order({order}) {



  return (
    <div className={style.order}>
      <h2>Order</h2>
      <p>{moment.unix( order.data.created ).format( "MMMM DO YYYY h:mma" )}</p>
      <div className={style['order-id']}>
        {order.data.basket?.map( ( item ) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hiddenButto/>
          ) )}
        <CurrencyFormat renderText={( value ) => (
            <div className={style['total-price']}>
              <strong className={style['order-total']}>Order Total : {value}</strong>
            </div>
          )}
            decimalScale={2}
            value={getBasketTotal(order.data.basket)}
            displayType='text'
            thousandSeparator={true}
            prefix={"$"}
        />
       </div>
    </div>
  )
}

export default Order;