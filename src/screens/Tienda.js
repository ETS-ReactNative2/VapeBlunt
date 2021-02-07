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

import { colors } from '../assets';

import * as Shopify from '../lib/graphql-shopify'

const SectionHeader = (props) => {
  const { title = ""} = props;
  return(
    <View style={styles.sectionHeader}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        {title}
      </Text>
      <Text style={{color: colors.lightgreen, fontSize: 16}}
        accessibilityRole='button'
        onPress={props.onPress}
      >
        Ver todo
      </Text>
    </View>
  )
}

const Tienda = (props) => {
  const { navigation } = props;
  const jumbo = React.useRef({
    width: 0,
    height: 0,
  })
  const [newProducts, setNewProducts] = React.useState([]);
  const [bestSellers, setBestSellers] = React.useState([]);

  const image = Image.resolveAssetSource(require('../assets/images/pax3.jpg'))
  jumbo.current = {
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').width*(image.height/image.width)),
  }

  React.useEffect(() => {
    Shopify.newProducts()
      .then(setNewProducts)
    Shopify.bestSellers()
      .then(setBestSellers)
  }, [])
  
  if(!newProducts || !bestSellers){
    return <></>
  }

	return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <Header onPress = {()=>{ navigation.navigate('Inicio') }} arrow searchBar text={'Tienda'}/>
        <ScrollView style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            paddingBottom: 80,
            paddingHorizontal: 20
          }}
          onScroll={Keyboard.dismiss}
        >
          <ImageBackground source={require('../assets/images/pax3.jpg')} 
            style={[styles.imgBackgroundStyle, jumbo.current]}>
            <BlackButton style={{width: 100, height: 30}}
              text={"Comprar"}
            />
          </ImageBackground>

          <NavigationButton text="Vaporizadores"
            style={{marginHorizontal: -20}}
            onPress={()=>navigation.navigate('Categorias')}
          />
          <NavigationButton text="Accesorios"
            style={{marginHorizontal: -20}}
            onPress={()=>navigation.navigate('Accesorios')}
          />
          <SectionHeader title="Nuevos"
            onPress={()=>{ navigation.navigate("NuevosProds")}}
          />
          {/* Start Product cards */}
          <ScrollView horizontal={true} style={{paddingVertical: 20}}>
            {newProducts.map((product) => (
              <ProductCard style={{marginRight: 20}}
                key={product.id} product={product}
                onPress={() => navigation.navigate('Producto', {id: product.id})}
              />
            ))}
          </ScrollView>
          {/* End Product cards */}
          <SectionHeader title="Los más vendidos"
            onPress={()=>{ navigation.navigate("MasVendidos")}}
          />
          <ScrollView horizontal={true} style={{paddingVertical: 20}}>
            {bestSellers.map((product) => (
              <ProductCard style={{marginRight: 20}}
                key={product.id} product={product}
                onPress={() => navigation.navigate('Producto', {id: product.id})}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBackgroundStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    marginHorizontal: -20
  }
})

export default Tienda;