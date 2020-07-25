import * as React from 'react';
import { ScrollView, Text, SafeAreaView, ImageBackground, Dimensions, StyleSheet, View, Image} from 'react-native';
import Header from '../components/Header';
import BlackButton from '../mini_components/BlackButton'
import ProductCard from '../components/ProductCard';
import NavigationButton from '../mini_components/NavigationButton';

import { newProducts, bestSellers } from '../lib/graphql-shopify'

const colors = require('../assets/colors');

export default class Tienda extends React.Component{
  constructor(props){
    super(props)
    let image = Image.resolveAssetSource(require('../assets/images/pax3.jpg'))
    this.state = {
      jumbo: {
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').width*(image.height/image.width)),
      },
      newProducts: [],
      bestSellers: [],
    }
  }

  componentDidMount(){
    newProducts().then((res) => {
      this.setState({newProducts: res})
    })
    //best sellers
    bestSellers().then((res) => {
      this.setState({bestSellers: res})
    })
  }


  render(){
    var { navigation } = this.props;
    var { jumbo, newProducts, bestSellers } = this.state;
    return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <Header onPress = {()=>{ navigation.navigate('Inicio') }} arrow searchBar text={'Tienda'}/>
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80}}>
          <ImageBackground source={require('../assets/images/pax3.jpg')} 
            style={[styles.imgBackgroundStyle, {width: jumbo.width, height: jumbo.height}]}>
            <BlackButton style={{width: 100, height: 30}} text={"Comprar"} onPress={()=>console.log()}/>
          </ImageBackground>

          <NavigationButton text="Vaporizadores" onPress={()=>{navigation.navigate('Categorias')}}/>
          <NavigationButton text="Accesorios" onPress={()=>{navigation.navigate('Accesorios')}}/>
          
          <View style={{marginTop: 30, paddingHorizontal: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nuevos</Text>
              <Text accessibilityRole='button' onPress={()=>{ navigation.navigate("NuevosProds") }}
                style={{color: colors.lightgreen, fontSize: 16}} >
                Ver todo
              </Text>
            </View>
            {/* Start Product cards */}
            <View>
              <ScrollView horizontal={true} style={{paddingVertical: 20}}>
                {newProducts.map((product) => {
                  return <ProductCard key={product.id} title={product.title} source={{uri: product.featuredImage.transformedSrc}}
                  width={140} style={{marginRight: 20}} onPress={() => navigation.navigate('Producto', {id: product.id})}/>
                })}
              </ScrollView>
            </View>
            {/* End Product cards */}
          </View>

          <View style={{marginTop: 30, paddingHorizontal: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Los más vendidos</Text>
              <Text accessibilityRole='button' onPress={()=>{ navigation.navigate("MasVendidos")}}
                style={{color: colors.lightgreen, fontSize: 16}} >
                Ver todo
              </Text>
            </View>
            {/* Start Product cards */}
            <View>
              <ScrollView horizontal={true} style={{paddingVertical: 20}}>
                {bestSellers.map((product) => {
                  return <ProductCard key={product.id} title={product.title} source={{uri: product.featuredImage.transformedSrc}}
                  width={140} style={{marginRight: 20}} onPress={() => navigation.navigate('Producto', {id: product.id})}/>
                })}
              </ScrollView>
            </View>
            {/* End Product cards */}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  imgBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  }
})
