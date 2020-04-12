import Product from '../../models/product'


export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';


export const fetchProducts =()=>{
  try{
    return async dispatch=>{
      const response = await fetch('https://shop-app-c2ab9.firebaseio.com/product.json');
      if(!response.ok){
        throw new Error("SOMETHING WENT WRONG")
      }
      //console.log(response)
      const resData = await response.json();
      //console.log(resData)
      let loadedData=[];
      for(const  key in resData){
        loadedData.push(new Product(key,'u1',
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price
        ))
      }
      dispatch({type:FETCH_PRODUCT,products:loadedData})
    }
  
  }
  catch(err){
    throw err;
  }
 
}
export const deleteProduct = productId => {
  return async dispatch =>{
    await fetch(`https://shop-app-c2ab9.firebaseio.com/product/${productId}.json`,{
      method:'DELETE',
  });
        dispatch( { type: DELETE_PRODUCT, pid: productId });
  
}
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch =>{
   const response = await fetch('https://shop-app-c2ab9.firebaseio.com/product.json',{
     method:'POST',
     header:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify({
       title,
       imageUrl,
       price,
      description
     })
   })
   const resData= await response.json();
   
    dispatch(
       {
        type: CREATE_PRODUCT,
        productData: {
          id:resData.name,
          title,
          description,
          imageUrl,
          price
        }
    }
    )
  
  }
  

}

export const updateProduct = (id, title, description, imageUrl) => {

    return async dispatch =>{
      await fetch(`https://shop-app-c2ab9.firebaseio.com/product/${id}.json`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          title,
          imageUrl,
          description
        })
      })
     dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
     })
  
  };
};
