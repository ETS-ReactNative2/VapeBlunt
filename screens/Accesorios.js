import * as React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import {
  Header,
  ProductCard,
} from '../components';

import { loadCollectionProducts } from '../lib/graphql-shopify'

const Accesorios = (props) => {
  const { navigation } = props;
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    loadCollectionProducts('30121787').then(setProducts);
  }, [])

  return(
    <SafeAreaView style={{ backgroundColor: 'black' }}>
    <Header onPress = {()=>{ navigation.navigate('Tienda') }} arrow text={"Accesorios"}/>
    <ScrollView style={{backgroundColor: 'white'}}
    contentContainerStyle={styles.containerSyle}>
      {
        products.map((product, i) => (
          <ProductCard product={product} key={product.id}
          onPress={()=> navigation.navigate('Producto', {id: product.id})}
          />
        ))
      }
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  productsRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  containerSyle: {
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 10,
    paddingHorizontal: 20,
  }
})

export default Accesorios;