import React,{ useState, useEffect } from 'react';
import style from '../cssModules/orders.module.css';
import Order from './Order';
import { useAuth } from '../context/globalState';
import { collection, onSnapshot, query,orderBy } from 'firebase/firestore';
import { db } from '../firebase';


function Orders () {
  const [orders, setOrders] = useState( [] );
  const { user } = useAuth();


  useEffect( () => {
    if ( user ) {
      
      const collRef = collection( db, "users", user?.uid, "orders" );
      const orderedRef = query( collRef, orderBy( "created", "desc" ) );
      onSnapshot( orderedRef, ( querySnapshot ) => {
        setOrders(
          querySnapshot.docs.map( ( doc ) => ( {
            id: doc.id,
            data: doc.data(),
          } ) )
        );
      } );
    } else {
      setOrders( [] );
    }
  }, [user] );





  return (
    <div className={style.orders}>
      <h1>Your Orders</h1>
     { orders.length > 0 ? <div className={style['orders-order']}>
        {orders?.map( ( order,index ) => ( <Order order={order} key={index} />))}
      </div>
      : <p>You didn't buy anything yet. let's go shopping now!</p>}
    
    </div>
  )
}

export default Orders;