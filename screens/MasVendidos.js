import * as React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

import { bestSellers } from '../lib/graphql-shopify'

export default class MasVendidos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        bestSellers().then((res) => {
            this.setState({ products: res })
        })
    }

    renderProducts= () => {
        let renderedProducts = [];
        var { products } = this.state;
        var { navigation } = this.props;
        for(let i=0; i<products.length; i+=2){
            if(products[i+1]){
                renderedProducts.push(<View key={i} style={styles.productsRow}>
                <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
                  onPress={()=> navigation.navigate('Producto', {id: products[i].id})}/>
                <ProductCard title={products[i+1].title} source={{uri: products[i+1].featuredImage.transformedSrc}}
                  onPress={()=> navigation.navigate('Producto', {id: products[i+1].id})}/>
              </View>)
            }else{
                renderedProducts.push(<View key={i} style={styles.productsRow}>
                <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
                  onPress={()=> navigation.navigate('Producto', {id: products[i].id})}/>
              </View>)
            }
          }
          return renderedProducts;
        }

    render(){
        var { navigation } = this.props;
        return(
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <Header onPress = {()=>{ navigation.navigate('Tienda') }} arrow searchBar text={'Más Vendidos'}/>
                    <ScrollView style={{backgroundColor: 'white' }} contentContainerStyle={{alignItems: 'center', 
                    paddingBottom: 80, paddingTop: 20, paddingHorizontal: 20 }}>                       
                        {this.renderProducts()}                        
                    </ScrollView>
            </SafeAreaView>
        );
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