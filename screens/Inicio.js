// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet } from 'react-native';
import PromoImage from '../components/PromoImage';
import PromoProduct from '../components/PromoProduct';
import PromoBlog from '../components/PromoBlog';
import Header from '../components/Header';

const Inicio = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <Header onPress={()=> navigation.openDrawer()}/>
      <ScrollView contentContainerStyle ={styles.container}>
        <PromoImage onPress ={()=> navigation.navigate('Tienda')}/>
        <PromoProduct id={"gid://shopify/Product/4417083146327"} navigation={navigation}/>
        <PromoBlog onPress ={()=> navigation.navigate('Blog')}/>
      </ScrollView>
    </SafeAreaView>
  )};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: 50,
    backgroundColor:'white'
  },
});

export default Inicio;