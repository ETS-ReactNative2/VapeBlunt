// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import React from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  SafeAreaView,
  PromoImage,
  PromoProduct,
  PromoBlog,
  Header,
} from '../components';

import { newProducts } from "../shopify/products";


const Inicio = (props) => {
  const { navigation } = props;
  const [newestProduct, setNewestProduct] = React.useState();

  React.useEffect(() => {
    navigation.setOptions({
      title: ''
    })
    newProducts().then((res) => {
      if(res.length > 0){
        setNewestProduct(res.pop());//Last one
      }
    }).catch((err) => {
      console.log("Error fetching products", err)
    })
  }, [])

  return(
    (newestProduct) ? (
      <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView contentContainerStyle ={styles.container}>
          <PromoImage onPress ={() => navigation.navigate('Tienda')}/>
          <PromoProduct handle={newestProduct.handle} navigation={navigation}/>
        </ScrollView>
      </SafeAreaView>
    ) : <></>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: 50,
    backgroundColor:'white'
  },
});

export default Inicio;