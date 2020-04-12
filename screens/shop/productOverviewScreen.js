import React from 'react';
import {FlatList } from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';


import ProductItem from '../../component/shop/productItem';
import HeaderButton from '../../components/UI/headerButton';

const ProductOverviewScreen=(props)=>{
    const product =useSelector(state=>state.products.availableProducts)
  
    return (<FlatList data={product} keyExtractor={item=>item.id} renderItem={itemData=><ProductItem title={itemData.item.title}
         image={itemData.item.imageUrl} price={itemData.item.price} description={itemData.item.description} onAddToCart={()=>{}} 
         onViewDetail={()=>{props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})}}></ProductItem>}></FlatList>)
}

ProductOverviewScreen.navigationOptions={
    headerTitle:'All Products',
    headerRight:(<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Cart" iconName='md-cart' onPress={()=>{}}/>
                </HeaderButtons>
                )
}

export default ProductOverviewScreen