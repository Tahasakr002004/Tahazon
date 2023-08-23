const initialState = {
  user: null,
  basket:[],
}


 const getBasketTotal = (basket) =>
  basket.reduce((accum, item) => {
    return accum + item.price;
  }, 0 );
  





const AppReducer = (state=initialState , action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      return {
        ...state, 
        basket: [...state.basket, action.item]
      };
    
    case "REMOVE_FROM_BASKET":
      // const index = state.basket?.findIndex(
      //   (basketItem) => basketItem.id === action.id
      // );
      
      let newBasket = [...state.basket];
      // if (index >= 0) {
        //   newBasket.splice(index, 1);
        // } else {
          //   console.warn(
            //     `can not remove product {id ${action.id} as its not in basket!`
            //   );
            // }
      return {
        ...state,
        basket: newBasket.filter((item) => item.id !== action.id),
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
export { initialState,getBasketTotal };
export default AppReducer;
