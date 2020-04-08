import  PRODUCTS from '../../data/4.1 dummy-data.js';

const initialState={
   
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS
};


export default (state=initialState,action)=>{
    return state 
}