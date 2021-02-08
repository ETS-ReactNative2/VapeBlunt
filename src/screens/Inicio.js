// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  PromoImage,
  PromoProduct,
  PromoBlog,
  Header,
} from '../components';
import { loadBlogsCollection } from "../lib/mongodb-server";
import { newProducts } from "../lib/graphql-shopify.js";

const Inicio = (props) => {
  const { navigation } = props;
  const [newestProduct, setNewestProduct] = React.useState();
  const [newestBlog, setNewestBlog] = React.useState();

  React.useEffect(() => {
    newProducts().then((res) => {
      if(res.length > 0){
        setNewestProduct(res.pop());//Last one
      }
    }).catch((err) => {
      console.log("Error fetching products", err)
    })

    loadBlogsCollection().then((res) => {
      if(res.length > 0){
        setNewestBlog(res.pop())//Last one
      }
    }).catch((err) => {
      console.log("Error fetching blogs", err)
    })
  }, [])

  return(
    (newestProduct) ? (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <Header onPress={navigation.openDrawer}/>
        <ScrollView contentContainerStyle ={styles.container}>
          <PromoImage onPress ={() => navigation.navigate('Tienda')}/>
          <PromoProduct id={newestProduct.id} navigation={navigation}/>
          {newestBlog && (
            <PromoBlog title={newestBlog.title}
              description={newestBlog.description}
              source={newestBlog.thumbnail}
              onPress ={()=> navigation.navigate('Blog')}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    ) : <></>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: 50,
    backgroundColor:'white'
  },
});

export default Inicio;