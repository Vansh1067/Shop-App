import React from 'react';
import {FlatList, View,Text } from 'react-native';
import {useSelector} from 'react-redux';


const ProductOverviewScreen=()=>{
    const product =useSelector(state=>state.products.availableProducts)
  
    return (<FlatList data={product} keyExtractor={item=>item.id} renderItem={itemData=><Text>{itemData.item.title}</Text>}></FlatList>)
}

ProductOverviewScreen.navigationOptions={
    headerTitle:'All Products'
}

export default ProductOverviewScreen