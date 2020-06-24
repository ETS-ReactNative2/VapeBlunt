import * as React from 'react';
import Header from '../components/Header';
import {  View, Text, SafeAreaView,ScrollView} from 'react-native';
import ItemCarrito from '../components/ItemCarrito';
import BlackButton from '../mini_components/BlackButton';

const colors = require('../assets/colors');

const Carrito = ({navigation}) => {

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress = {()=>{navigation.navigate('Inicio')} } arrow/>
      <View style={{ flex: 1, backgroundColor:'white'}}>
        <ScrollView>
          <ItemCarrito/>
        </ScrollView>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Subtotal</Text>
            <Text style={{padding:10,fontSize:15}}>$3,290.00</Text>
        </View>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Impuestos</Text>
            <Text style={{padding:10,fontSize:15}}>$0</Text>
        </View>
        <View style={{justifyContent:'space-between',flexDirection:"row", borderTopColor:"rgba(0, 0, 0, 0.1)", borderTopWidth:1,borderBottomColor:"rgba(0, 0, 0, 0.1)",borderBottomWidth:1}}>
            <Text style={{fontSize:15,fontWeight:'bold',padding:10}}>Total</Text>
            <Text style={{padding:10,fontSize:15}}>$3,290</Text>
        </View>
        
        
        
        <View style={{alignItems:"center"}}>
          <BlackButton style={{width: 325, height: 50,marginTop:20,marginBottom:20,borderRadius:30}} text={"Pagar"} fontSize={18} onPress={()=>console.log()}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Carrito;