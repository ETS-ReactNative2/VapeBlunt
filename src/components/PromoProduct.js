import * as React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import BlackButton from '../mini_components/BlackButton'
import { productInfo } from '../shopify/products'

const defaultImage = Image.resolveAssetSource(require('../assets/images/PromoImage.png'))

const PromoProduct = (props) => {
  const { navigation } = props;
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    productInfo(props.handle).then(setProduct);
  }, [])

  const navigateToProductDetail = React.useCallback(() => {
    product && navigation.navigate('Producto', {handle: product.handle})
  }, [product, navigation])

  return product ? (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.imageButton}
        onPress={navigateToProductDetail}
      >
        <Image source={{uri: product.image} || defaultImage}
          resizeMode='contain'
          width={200} height={200}
          style={styles.image}
        /> 
      </TouchableOpacity>
      <BlackButton text={'Comprar'}
        style={{ width: 100, height: 35 }}
        onPress={navigateToProductDetail}
      />
    </View>
  ) : <></>
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
  }
})

export default PromoProduct;