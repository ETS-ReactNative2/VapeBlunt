import React from 'react';
import { ScrollView, StyleSheet, Keyboard} from 'react-native';
import ProductCard from '../components/ProductCard';

const ProductsScrollView = (props) => {
  const { products } = props;
  return(
    <ScrollView style={styles.scrollview}
        contentContainerStyle={styles.containerStyle}
        onScroll={()=>Keyboard.dismiss()}
      >
      {products.map((product, i) => (
        <ProductCard product={product} 
          style={styles.productCard}
          key={product.id+i}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: 'white',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 80,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
  }
})

export default ProductsScrollView;