import * as React from 'react';
import Header from '../components/Header';
import {  View, Text, SafeAreaView} from 'react-native';

const Blog = ({navigation }) => {
 
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress = {()=>{navigation.navigate('Inicio')} } arrow/>
      <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
        <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 16 }}>
          You are on Blog Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Blog;