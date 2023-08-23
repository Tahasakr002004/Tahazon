import React,{useEffect,useState} from 'react'
import style from '../cssModules/payment.module.css'
import { useAuth } from '../context/globalState';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from '../context/AppReducer';
import  CurrencyFormat  from 'react-currency-format';
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js';
import instance from './axios';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Payment () {
  
  const { basket,user,dispatch } = useAuth();
  const [clientSecretKey, setClientSecretKey] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded,setSucceeded] = useState(false);
  const [processing,setProcessing] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();


  useEffect( () => {
    const getClientSecret = async () => {
      
      const response = await instance( {
        method: "post",
        url:`/payments/create?total=${getBasketTotal(basket) * 100}`,
      } )
      setClientSecretKey( response.data.clientSecret );
      return response;
    }
    getClientSecret();
  }, [basket] );


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setProcessing( true );
    const payload = await stripe.confirmCardPayment( clientSecretKey, {
      payment_method: {
        card: elements.getElement( CardElement )
      }
    } ).then( ( {paymentIntent} ) => {
      const ref = doc( db, "users", user?.uid, "orders", paymentIntent.id );
      setDoc( ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created:paymentIntent.created,
      } );
      setSucceeded( true );
      setError( null );
      setProcessing( false );
      navigate( "/orders", { replace: true } );
      dispatch( { type: "EMPTY_BASKET" } );
    } );
  }
  const handleChange = (event) => {
    setDisabled( event.empty );
    setError(error ? error.message : '')
  }



  return (
    <div className={style.payment}>
      <div className={style['payment-container']}>
        <h1>
          Checkout(<Link to="/checkout">{basket.length} item</Link>)
        </h1>
        <div className={style['payment-section']}>
          <div className={style['payment-title']}>
              <h3>Delivery Address</h3>
          </div>
          <div className={style['payment-address']}>
            <p>{user?.email}</p>
            <p>Mannheim,Deutschland</p>
          </div>
        </div>
        <div className={style['payment-section']}>
          <div className={style['payment-title']}>
              <h3>Review items and delivery</h3>
          </div>
          <div className={style['payment-items']}>
            {
              basket.map( ( item ) => 
                <CheckoutProduct key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              )
           }
          </div>
        </div>
        <div className={style['payment-section']}>
            <div className={style['payment-title']}>
                <h3>Payment Method</h3>
          </div>
          
          <div className={style['payment-details']}>
            <form onSubmit={handleSubmit} >
              <CardElement onChange={handleChange} />
              <div className={style['payment-priceContainer']}>
               { basket.length > 0 ? (<CurrencyFormat renderText={( value ) => 
                  <h3>Order Total: {value}</h3>
                  }
                  decimalScale={2}
                  value={getBasketTotal( basket )}
                  displayType='text'
                  thousandSeparator={true}
                  prefix={"$"}
                />) : '' }
                {basket.length > 0 ? <button type="submit" disabled={processing || disabled || succeeded}>{ processing ? <p>Processing</p> : "Buy Now"}</button> : ''}
              </div>
              {error && <div>{error}</div> }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;