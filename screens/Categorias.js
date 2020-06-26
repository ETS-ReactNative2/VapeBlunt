import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BlackButton from '../mini_components/BlackButton';


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
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{alignItems: 'center',paddingBottom: 80, paddingTop: 10, paddingHorizontal: 20}}>
        <ScrollView horizontal style={{paddingVertical: 10, marginBottom: 10}}>
          <SubCategoryButton text="Portátil" active/>
          <SubCategoryButton text="De Mesa"/>
          <SubCategoryButton text="Estilo pluma"/>
          <SubCategoryButton text="Herbales"/>
          <SubCategoryButton text="De Mesa"/>
          <SubCategoryButton text="Estilo pluma"/>
          <SubCategoryButton text="Herbales"/>
        </ScrollView>
        <View style={{alignSelf: 'stretch',flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
          <ProductCard onPress={()=> navigation.navigate('Producto')}/>
          <ProductCard/>
        </View>
        <View style={{alignSelf: 'stretch',flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
          <ProductCard/>
          <ProductCard/>
        </View><View style={{alignSelf: 'stretch',flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
          <ProductCard/>
          <ProductCard/>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }
}