// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView,Image } from 'react-native';
function CustomHeader(navigation){
  return(
  <View style={{flexDirection:"row",height:50,borderWidth:1,borderColor:'red'}}>
     <View style={{flex:1,justifyContent:'center', borderColor:'red', borderWidth:1}}>
      
      <TouchableOpacity onPress={() =>  navigation.openDrawer()} >
      
      <Image style= {{alignContent:"center",backgroundColor:"green",height:30,width:30,marginLeft:4}}
      source= {require('../icons/jamburger.png')}
      resizeMode="contain"
      />
      </TouchableOpacity>

     </View>
     
     
     <View style={{flex:4,borderColor:'red', borderWidth:1}}></View>


 </View>
 )

}
const Inicio = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <CustomHeader navigation={navigation}/>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'white',
           
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            You are on Home Screen
          </Text>
          
         
        </View>
      
       
      </View>
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