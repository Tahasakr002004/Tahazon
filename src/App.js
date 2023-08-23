import React, { useEffect } from 'react'
import {Routes,Route} from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home';
import Login from "./components/Login";
import Checkout from './components/Checkout';
import  Orders from './components/Orders';
import Payment from './components/Payment';
import { useAuth } from './context/globalState';
import { auth } from './firebase';
import { loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const STRIPE_PUBLIC_KEY ="pk_test_51NaNkLHFMFSMp2UTNHegqHcvOndgUTyUw00dJYTaobEMNtGFWlHzNbhlEv4JKxL2IxrP0gk8rwCx0XGFSkuBmbvC007SDfuXLw";
const App = () => {

  const { dispatch } = useAuth();
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    useEffect(() => {
      auth.onAuthStateChanged( ( authUser ) => {
       if (authUser) {
        
        dispatch({type:"SET_USER", user:authUser});
      }else {
         dispatch({
           type: 'SET_USER',
           user: null,
        });
      }
    })
  },[dispatch]);


  return (
    <div className="app">
      <Routes>
        <Route path="/" element=
          {<>
          <Header />
          <Home/>
          </>} />
            <Route path="/checkout" element=
              {<>
              <Header />
              <Checkout/>
             </>} />
           <Route path="/payment" element={
            <>
            <Header />
            <Elements stripe={stripePromise}>
                 <Payment/>
            </Elements>
            </>
            }></Route>
           <Route path="/orders" element={<Orders />} />
           <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Page Not Found</h1>}/>
      </Routes>
    </div>
  )
}

export default App;