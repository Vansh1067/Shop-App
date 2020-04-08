import React from 'react';
import {FlatList } from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../component/shop/productItem'

const ProductOverviewScreen=(props)=>{
    const product =useSelector(state=>state.products.availableProducts)
  
    return (<FlatList data={product} keyExtractor={item=>item.id} renderItem={itemData=><ProductItem title={itemData.item.title}
         image={itemData.item.imageUrl} price={itemData.item.price} description={itemData.item.description} onAddToCart={()=>{}} 
         onViewDetail={()=>{props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})}}></ProductItem>}></FlatList>)
}

ProductOverviewScreen.navigationOptions={
    headerTitle:'All Products'
}

export default ProductOverviewScreen