import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import BlackButton from '../mini_components/BlackButton';

const colors = require('../assets/colors');

function SubCategoryButton(props){
  if(props.active){
    return(
      <BlackButton text={props.text}/>
    )
  }else{
    return(
      <TouchableOpacity>
        <Text>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default class Categorias extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var { navigation } = this.props;
    return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Header onPress = {()=>{ navigation.navigate('Tienda') }} arrow/>
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80, paddingTop: 15, paddingHorizontal: 20}}>
        <ScrollView horizontal>
          <SubCategoryButton text="Portátil" active/>
          <SubCategoryButton text="De Mesa"/>
          <SubCategoryButton text="Estilo pluma"/>
          <SubCategoryButton text="Herbales"/>
        </ScrollView>
        <Text accessibilityRole='button' onPress={()=>console.log()}
          style={{color: colors.lightgreen, fontSize: 16}}>
          Categoría screen
        </Text>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

//require('../assets/images/davinci-black.png')