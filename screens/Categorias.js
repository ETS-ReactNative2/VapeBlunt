import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BlackButton from '../mini_components/BlackButton';

const colors = require('../assets/colors');

function SubCategoryButton(props){
  if(props.active){
    return(
      <BlackButton style={{marginRight: 20, height: 25}} text={props.text}/>
    )
  }else{
    return(
      <TouchableOpacity style={{marginRight: 20}}>
        <Text style={{color: 'rgba(91, 91, 91, 0.4)'}}>{props.text}</Text>
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
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80, paddingTop: 10, paddingHorizontal: 20}}>
        <ScrollView horizontal style={{paddingVertical: 10}}>
          <SubCategoryButton text="Portátil" active/>
          <SubCategoryButton text="De Mesa"/>
          <SubCategoryButton text="Estilo pluma"/>
          <SubCategoryButton text="Herbales"/>
          <SubCategoryButton text="De Mesa"/>
          <SubCategoryButton text="Estilo pluma"/>
          <SubCategoryButton text="Herbales"/>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ProductCard/>
          <ProductCard/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ProductCard/>
          <ProductCard/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ProductCard/>
          <ProductCard/>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}