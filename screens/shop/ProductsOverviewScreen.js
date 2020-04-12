import React ,{useEffect,useState,useCallback}from 'react';
import { FlatList, Button, Platform,ActivityIndicator,View,Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import { isLoaded, loadAsync } from 'expo-font';

const ProductsOverviewScreen = props => {
  const [isLoading,setIsLoading] =useState(false)
  const [error,setError] =useState()
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadproducts= useCallback(async ()=>{
    setError(null)
    setIsLoading(true)
    try{
      await dispatch(productActions.fetchProducts());
    }catch(err){
      setError(err.message)
    }
    
    setIsLoading(false)
  },[dispatch,setIsLoading,setError])
  useEffect( ()=>{
    const willFocus=props.navigation.addListener('willFocus',loadproducts);
    return ()=>{
      willFocus.remove();
    }
  },[loadproducts])
  useEffect(()=>{
   
    loadproducts()
  },[loadproducts])
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  if(isLoading){
    return (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <ActivityIndicator size='large' color={Colors.primary}></ActivityIndicator>
    </View>)
  }
  if(error){
    <View>
      <Text>AN error Occured</Text>
      <Button title="Try Again" onPress={loadproducts}></Button>
    </View>

  }
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
