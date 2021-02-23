// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  SafeAreaView,
  PromoImage,
  PromoProduct,
} from '../components';

import { newProducts } from "../shopify/products";


const Inicio = (props) => {
  const { navigation } = props;
  const [newestProduct, setNewestProduct] = React.useState();

  React.useEffect(() => {
    navigation.setOptions({
      title: ''
    })
    newProducts(1).then((res) => {
      if(res.length > 0){
        setNewestProduct(res.pop());//Last one
      }
    }).catch((err) => {
      console.log("Error fetching products", err)
    })
  }, [])

  return(
    (newestProduct) ? (
      <SafeAreaView style={{backgroundColor:'white'}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <PromoImage onPress ={() => navigation.navigate('Tienda')}/>
          <PromoProduct handle={newestProduct.handle} navigation={navigation}/>
        </ScrollView>
      </SafeAreaView>
    ) : <></>
  )
}

export default Inicio;