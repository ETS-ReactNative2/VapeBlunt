import React from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  SafeAreaView,
  ProductCard
} from '../components';
import {
  BlackButton,
  NavigationButton,
} from '../mini_components';

import { colors } from '../assets';

import {
  newProducts as getNewProducts,
  bestSellers as getBestSellers,
  loadCollectionProducts,
} from '../shopify/products'

import config from '../config';
const { categoryTable } = config;

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
    getNewProducts().then(setNewProducts)
    getBestSellers().then(setBestSellers)
  }, [])
  
  if(!newProducts || !bestSellers){
    return <></>
  }

  const navigateDisplay = React.useCallback((title) => {
    let params = { title };
    switch(title){
      case 'Nuevos Productos': {
        params.products = newProducts;
        break;
      }
      case 'Más Vendidos': {
        params.products = bestSellers;
        break;
      }
      case 'Accesorios': {
        params.fetcher = () => loadCollectionProducts(categoryTable['Accesorios']);
      }
    }
    return () => navigation.navigate('Display Products', params);
  }, [navigation, loadCollectionProducts, newProducts, bestSellers]);

	return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
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
            onPress={() => navigation.navigate('Categorias')}
          />
          <NavigationButton text="Accesorios"
            style={{marginHorizontal: -20}}
            onPress={navigateDisplay('Accesorios')}
          />
          {/* Start Product cards */}
          <SectionHeader title="Nuevos"
            onPress={navigateDisplay('Nuevos Productos')}
          />
          <ScrollView horizontal style={{paddingVertical: 20}}>
            {newProducts.map((product) => (
              <ProductCard style={{marginRight: 20}}
                key={product.id} product={product}
              />
            ))}
          </ScrollView>
          {/* End Product cards */}
          <SectionHeader title="Los más vendidos"
            onPress={navigateDisplay('Más Vendidos')}
          />
          <ScrollView horizontal style={{paddingVertical: 20}}>
            {bestSellers.map((product) => (
              <ProductCard style={{marginRight: 20}}
                key={product.id} product={product}
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