import * as React from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  Header,
  ProductCard
} from '../components';
import {
  BlackButton,
  NavigationButton,
} from '../mini_components';

import * as Shopify from '../lib/graphql-shopify'

import { colors } from '../assets';

const Tienda = (props) => {
  const { navigation } = props;
  const jumbo = React.useRef({
    width: 0,
    height: 0,
  })
  const [newProducts, setNewProducts] = React.useState();
  const [bestSellers, setBestSellers] = React.useState();

  const image = Image.resolveAssetSource(require('../assets/images/pax3.jpg'))
  jumbo.current = {
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').width*(image.height/image.width)),
  }

  React.useEffect(() => {
    Shopify.newProducts()
      .then(setNewProducts)
      .catch((err) => console.log("Error fetching new products", err))
    Shopify.bestSellers()
      .then(setBestSellers)
      .catch((err) => console.log("Error fetching best sellers", err))
  }, [])

  console.log("new", newProducts)
  console.log("best", bestSellers)
  
  if(!newProducts || !bestSellers){
    return <></>
  }

	return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <Header onPress = {()=>{ navigation.navigate('Inicio') }} arrow searchBar text={'Tienda'}/>
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 80}}
        onScroll={()=>Keyboard.dismiss()}>
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
                {newProducts.map((product) => (
                  <ProductCard key={product.id}
                    title={product.title}
                    source={{uri: product.featuredImage.transformedSrc}}
                    width={140} style={{marginRight: 20}}
                    onPress={() => navigation.navigate('Producto', {id: product.id})}
                  />
                ))}
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

const styles = StyleSheet.create({
  imgBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  }
})

export default Tienda;