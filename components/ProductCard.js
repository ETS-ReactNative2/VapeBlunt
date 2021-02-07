import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';

const colors = require('../assets/colors')

const ProductCard = (props) => {
  const { product } = props;

  return (
    <TouchableOpacity style={[{alignItems: 'center'}, props.style]}
      onPress={() => props.onPress()}
    >
      <Image style={styles.image}
        resizeMode='center'
        source={{uri: product.featuredImage}}
      />
      <Text style={styles.title}
      >
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