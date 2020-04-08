import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native'; 

import productOverviewScreen from '../screens/shop/productOverviewScreen';
import productDetailScreen from '../screens/shop/productDetails'
import Color from '../constants/color';


const productNavigator=createStackNavigator({
    ProductOverview:productOverviewScreen,
    ProductDetail:productDetailScreen

},{
    defaultNavigationOptions:{
        
        headerStyle:{
            backgroundColor:Color.primary
        },
        headerTintColor:Platform.OS==='android'? 'white': Color.primary
    }
})

export default createAppContainer(productNavigator)