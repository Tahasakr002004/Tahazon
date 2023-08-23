import React from 'react'
import style from '../cssModules/subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { useAuth } from '../context/globalState';
import { getBasketTotal } from '../context/AppReducer';
import { useNavigate } from 'react-router-dom';

function Subtotal () {
  const { basket } = useAuth();
  const navigate = useNavigate();



  return (
    <div className={style.subtotal}>
      <CurrencyFormat renderText={( value ) => (
        <>
          <p>
            Subtotal({basket.length} items):
            <strong>{value}</strong>
          </p>
          <small className={style['subtotal__gift']}>
              <input type="checkbox" /> This order contains a gift
          </small>
        </>
      )}
        decimalScale={2}
        value={getBasketTotal( basket )}
        displayType='text'
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal;