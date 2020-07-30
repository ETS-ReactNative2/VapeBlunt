// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView,ScrollView,StyleSheet } from 'react-native';
import PromoImage from '../components/PromoImage';
import PromoProduct from '../components/PromoProduct';
import PromoBlog from '../components/PromoBlog';
import Header from '../components/Header';
import { loadBlogsCollection } from "../lib/mongodb-server";
import { newProducts } from "../lib/graphql-shopify.js";

export default class Inicio extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      newestBlog: '',
      newestProduct: '',
    };
  }

  componentDidMount(){
    loadBlogsCollection().then((res) => {
      let  allBlogs  = res
      this.setState({newestBlog: allBlogs.pop()})
    })
    newProducts().then((res) => {
      let  allProducts  = res
      this.setState({newestProduct: allProducts.pop()})
    })
  }

  render(){
    let { navigation } = this.props
    var { newestProduct, newestBlog } = this.state
    if (newestProduct.id == undefined){
      return null;
    } else {
      return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Header onPress={()=> navigation.openDrawer()}/>
              <ScrollView contentContainerStyle ={styles.container}>
                <PromoImage onPress ={()=> navigation.navigate('Tienda')}/>
                <PromoProduct id = {newestProduct.id} 
                              navigation={navigation}/>
                <PromoBlog  title={newestBlog.title}
                            description={newestBlog.description}
                            source={newestBlog.thumbnail}
                            onPress ={()=> navigation.navigate('Blog')}/>
              </ScrollView>
        </SafeAreaView>
    )}
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: 50,
    backgroundColor:'white'
  },
 }
);