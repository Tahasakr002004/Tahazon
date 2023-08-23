import React from 'react'
import style from '../cssModules/product.module.css'
import { useAuth } from '../context/globalState';
import {AiFillStar} from 'react-icons/ai'


const Product = ( { title, price, image, rating, id } ) => {
  const { dispatch,basket } = useAuth();
  const addToBasket = ( event ) => {
    event.preventDefault();
    dispatch( {
      type: "ADD_TO_BASKET",
      item: {
        id:id,
        title:title,
        image:image,
        price:price,
        rating:rating,
      }
    } );
  }
  console.log( basket );

  return (
    <div className={style.product}>
      <div className={style['product-info']}>
          <p>{title}</p>
        <p className={style['product-price']}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      
         {window.innerWidth > 565 ?
        <div className={style['product-rating']}>
          {Array( rating ).fill().map( ( _, index ) =>
            <p key={index}>
            <AiFillStar className={style['star-Icon']} />
          </p>)}
        </div> : ''}
      </div>
        <img src={image} alt="product-img" />
        <button onClick={addToBasket}>Add to Basket</button>
  </div>
  )
}

export default Product;