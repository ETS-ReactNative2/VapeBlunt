import React from 'react';
import {
  SafeAreaView,
  Header,
  ProductsScrollView,
} from '../components';

const DisplayProducts = (props) => {
  const { navigation } = props;
  const {
    products,
    title = '',
    fetcher
  } = props.route.params;
  const [renderedProducts, setRenderedProducts] = React.useState(products);

  React.useEffect(() => {
    if(!products && fetcher){
      fetcher().then(setRenderedProducts)
    }
  }, [])

  return(
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      {renderedProducts && (
        <ProductsScrollView products={renderedProducts}/>
      )}
    </SafeAreaView>
  )
}

export default DisplayProducts;