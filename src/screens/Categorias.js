import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  SafeAreaView,
  ProductsScrollView,
} from '../components';
import { BlackButton } from '../mini_components';

import { loadCollectionProducts } from '../shopify/products'

import config from '../config';
const { categoryTable } = config;

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
    navigation.setOptions({
      title: ''
    })
    loadCollectionProducts(categoryTable[selectedCategory])
      .then(setProducts);
  }, [])

  React.useEffect(() => {
    loadCollectionProducts(categoryTable[selectedCategory])
      .then(setProducts);
  }, [selectedCategory])
  
  return(
    <SafeAreaView style={{ backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <ScrollView horizontal 
          contentContainerStyle = {{
            justifyContent: 'flex-start'
          }}
        >
          {categories.map((category) => (
            <SubCategoryButton 
              text={category} key={category}
              onPress={() => setSelectedCategory(category)}
              active={selectedCategory === category}
            />
          ))}
        </ScrollView>
      </View>
      <ProductsScrollView products={products}/>
    </SafeAreaView>
  )
}

export default Categorias;