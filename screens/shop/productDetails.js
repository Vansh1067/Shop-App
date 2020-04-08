import React from 'react';
import {FlatList,Image,  View,Text,ScrollView, Button,StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';

import color from '../../constants/color'

const ProductDetailScreen=(props)=>{
    const productId=props.navigation.getParam('productId');
    const selectedProduct =useSelector(state=>state.products.availableProducts.find(prod=>prod.id===productId))
  
    return (<ScrollView>
        <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}></Image>
        <View style={styles.action}>
        <Button color={color.primary} title="Add To Cart" onPress={()=>{}}></Button>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
    <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>)
}

ProductDetailScreen.navigationOptions=navData=>{
    return {
        headerTitle : navData.navigation.getParam('productTitle')
    }
   
}

const styles =StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20

    },
    action:{
        marginVertical:10,
        alignItems:'center'
    }
})


export default ProductDetailScreen