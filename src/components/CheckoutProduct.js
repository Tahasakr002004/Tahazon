import React from 'react'
import style from '../cssModules/checkoutProduct.module.css'
import starIcon from '../images/icons/star.png'
import { useAuth } from '../context/globalState';



function CheckoutProduct({id,title,image,price,rating,hiddenButton=false,}) {

  const { dispatch } = useAuth();
  const removeFromBasket = () => {
    dispatch( {
      type: "REMOVE_FROM_BASKET",
      id: id,
    } );
  }



  return (
    <div className={style.checkoutProduct}>
      <img className={style['checkoutProduct-image']} src={image} alt="product-img" />
      <div className={style['checkoutProduct-info']}>
        <p className={style['checkoutProduct-title']}>{title}</p>
        <p className={style['checkoutProduct-price']}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
          <div className={style['checkoutProduct-rating']}>
             {Array( rating ).fill().map( ( _, index ) =>
            <p key={index}>
               <img src={starIcon} alt="star-rating" />
            </p>)}
        </div>
        {hiddenButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
      </div>
    </div>
  )
}

export default CheckoutProduct;