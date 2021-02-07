import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const colors = require('../assets/colors')

const ProductCard = (props) => {
  const navigation = useNavigation();
  const { product } = props;

  const navigateToProduct = () => {
    navigation.navigate('Producto', {id: product.id})
  }

  return (
    <TouchableOpacity style={[{alignItems: 'center'}, props.style]}
      onPress={navigateToProduct}
    >
      <Image style={styles.image}
        resizeMode='center'
        source={{uri: product.featuredImage}}
      />
      <Text style={styles.title}>
        {product.title || ""}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    marginBottom: 0,
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightgrey
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left'
  }
})

export default ProductCard;