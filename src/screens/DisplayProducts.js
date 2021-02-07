import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  Header,
  ProductsScrollView,
} from '../components';

const DisplayProducts = (props) => {
  const { navigation, title = '' } = props;
  const { products } = props.route.params;

  return(
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Header onPress = {navigation.goBack}
        arrow searchBar text={title}
      />
      <ProductsScrollView products={products}/>
    </SafeAreaView>
  )
}

export default DisplayProducts;