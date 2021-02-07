import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
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
    <TouchableOpacity style={[styles.touchable, props.style]}
      onPress={navigateToProduct}
    >
      <Image style={styles.image}
        resizeMode='contain'
        source={{uri: product.featuredImage}}
      />
      <Text style={styles.title}>
        {product.title || ""}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    width: 150,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: colors.lightgrey
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
  }
})

export default ProductCard;