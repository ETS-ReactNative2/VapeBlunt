import React from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import { Header, ProductCard } from '../components';
import { BlackButton } from '../mini_components';

import { loadCollectionProducts } from '../lib/graphql-shopify'

import { categoryTable } from '../config';

const categories = Object.keys(categoryTable);

const SubCategoryButton = (props) => {
  const { text } = props;
  return props.active ? (
    <BlackButton style={{marginRight: 20, height: 25}}
      text={text}
      onPress={props.onPress}
    />
  ) : (
    <TouchableOpacity style={{marginRight: 20}} onPress={props.onPress}>
      <Text style={{color: 'rgba(91, 91, 91, 0.4)'}}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const Categorias = (props) => {
  const { navigation } = props;
  const [products, setProducts] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

  React.useEffect(() => {
    loadCollectionProducts(categoryTable[selectedCategory])
      .then(setProducts);
  }, [])

  React.useEffect(() => {
    loadCollectionProducts(categoryTable[selectedCategory])
      .then(setProducts);
  }, [selectedCategory])
  
  return(
    <SafeAreaView style={{ backgroundColor: 'black' }}>
    <Header onPress={navigation.pop} arrow text="Vaporizadores"/>
    <ScrollView style={{backgroundColor: 'white'}}
      contentContainerStyle={styles.contentContainer}
    >
      <ScrollView horizontal style={{paddingVertical: 10, marginBottom: 10}}>
        {categories.map((category) => (
          <SubCategoryButton 
            text={category} key={category}
            onPress={() => setSelectedCategory(category)}
            active={selectedCategory === category}
          />
        ))}
      </ScrollView>
      {
        products.map((product, i) => (
          <ProductCard product={product} key={i}/>
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
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 10,
    paddingHorizontal: 20,
  }
})

export default Categorias;