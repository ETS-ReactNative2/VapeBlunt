import * as React from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, StyleSheet} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BlackButton from '../mini_components/BlackButton';

import {loadCollectionProducts} from '../lib/graphql-shopify'

const categories = ["Portátil", "De mesa", "Estilo pluma", "Herbales", "De ceras", "De líquidos"]

const categoryTable = {
  "Portátil": "30285443",
  "De mesa": "30285491",
  "Estilo pluma": "30285895",
  "Herbales": "29357859",
  "De ceras": "9845669912",
  "De líquidos": "400596878",
}

function SubCategoryButton(props){
  if(props.active){
    return(
      <BlackButton style={{marginRight: 20, height: 25}} text={props.text} onPress={() => props.onPress()}/>
    )
  }else{
    return(
      <TouchableOpacity style={{marginRight: 20}} onPress={() => props.onPress()}>
        <Text style={{color: 'rgba(91, 91, 91, 0.4)'}}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

export default class Categorias extends React.Component{
  constructor(props){
    super(props)
    this.renderProducts = this.renderProducts.bind(this)
    this.state = {
      activeTab: 'Portátil',
      products: []
    }
  }

  loadProducts = (category) => {
    let id = categoryTable[category]
    loadCollectionProducts(id).then((res) => {
      this.setState({activeTab: category, products: res})
    });
  }

  renderProducts = () => {
    let rendered = [];
    let {products} = this.state
    for(let i=0; i<products.length; i+=2){
      if(products[i+1]){
        rendered.push(<View key={i} style={styles.productsRow}>
          <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto')}/>
          <ProductCard title={products[i+1].title} source={{uri: products[i+1].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto')}/>
        </View>)
      }else{
        rendered.push(<View key={i} style={styles.productsRow}>
          <ProductCard title={products[i].title} source={{uri: products[i].featuredImage.transformedSrc}}
            onPress={()=> navigation.navigate('Producto')}/>
        </View>)
      }
    }
    return rendered;
  }

  componentDidMount(){
    loadCollectionProducts(categoryTable[this.state.activeTab]).then((res) => {
      this.setState({products: res})
    })
  }

  render(){
    var { navigation } = this.props
    var { activeTab } = this.state
    return(
      <SafeAreaView style={{ backgroundColor: 'black' }}>
      <Header onPress = {()=>{ navigation.navigate('Tienda') }} arrow/>
      <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 80, paddingTop: 10, paddingHorizontal: 20}}>
        <ScrollView horizontal style={{paddingVertical: 10, marginBottom: 10}}>
          {categories.map((category) => {
            return <SubCategoryButton key={category} text={category} onPress={() => this.loadProducts(category)}
            active = {activeTab === category}/>
          })}
        </ScrollView>
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