import * as React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

import {loadCollectionProducts} from '../lib/graphql-shopify'

export default class Accesorios extends React.Component{
  constructor(props){
    super(props)
    this.renderProducts = this.renderProducts.bind(this)
    this.state = {
      products: []
    }
  }

  renderProducts = () => {
    let rendered = [];
    let {products} = this.state
    let {navigation} = this.props
    for(let i=0; i<products.length; i+=2){
      if(products[i+1]){
        rendered.push(<View key={i} style={styles.productsRow}>
          <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto', {productId: products[i].id})}/>
          <ProductCard title={products[i+1].title} source={{uri: products[i+1].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto', {productId: products[i+1].id})}/>
        </View>)
      }else{
        rendered.push(<View key={i} style={styles.productsRow}>
          <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto', {productId: products[i].id})}/>
        </View>)
      }
    }
    return rendered;
  }

  componentDidMount(){
    //id accesorios
    loadCollectionProducts('30121787').then((res) => {
      this.setState({products: res})
    })
  }

  render(){
    var { navigation } = this.props
    return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Header onPress = {()=>{ navigation.navigate('Tienda') }} arrow text={"Accesorios"}/>
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 80, paddingTop: 10, paddingHorizontal: 20}}>
        {this.renderProducts()}
      </ScrollView>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  productsRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  }
})