// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,Image,ScrollView } from 'react-native';
import Header from '../components/Header'
import PromoImage from '../components/PromoImage';


const Inicio = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <Header onPress={()=> navigation.openDrawer()}/>
      
        <Text>Hola</Text>
          

          
          

        
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default Inicio;