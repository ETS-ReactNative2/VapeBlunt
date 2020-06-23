// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet } from 'react-native';
import Header from '../components/Header'
import PromoImage from '../components/PromoImage';
import PromoProduct from '../components/PromoProduct';
import PromoBlog from '../components/PromoBlog';




const Inicio = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      
      <ScrollView contentContainerStyle ={styles.container}>
        <PromoImage/>
        <PromoProduct onPress ={ ()=> navigation.navigate('Tienda')}/>
        <PromoBlog/>
        
      </ScrollView>
      

    </SafeAreaView>
  )};

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      paddingVertical:0,
      backgroundColor:'white'
    },
  });


export default Inicio;