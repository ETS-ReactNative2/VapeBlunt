// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet } from 'react-native';
import PromoImage from '../components/PromoImage';
import PromoProduct from '../components/PromoProduct';
import PromoBlog from '../components/PromoBlog';

const Inicio = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <ScrollView contentContainerStyle ={styles.container}>
        <PromoImage onPress ={()=> navigation.navigate('Tienda')}/>
        <PromoProduct onPress ={()=> navigation.navigate('Tienda')}/>
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