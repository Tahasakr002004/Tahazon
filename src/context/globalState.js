import { createContext, useContext,useReducer } from "react";
import  AppReducer  from './AppReducer'
import {initialState}   from './AppReducer';

const GlobalContext = createContext();





const GlobalProvider = ( { children } ) => {
  
  const [state, dispatch] = useReducer( AppReducer, initialState );


  return (
    <GlobalContext.Provider
      value={{ basket:state.basket, user:state.user, dispatch: dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
};


///////

export default GlobalProvider;
////hook
export const useAuth = () => {
  return useContext( GlobalContext );
}
