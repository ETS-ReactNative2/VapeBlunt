import * as React from 'react';
import Header from '../components/Header';
import {  View, Text, SafeAreaView} from 'react-native';
import BlogCard from '../components/BlogCard';
import { ScrollView } from 'react-native-gesture-handler';

const Blog = ({navigation }) => {

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Header onPress = {()=>{navigation.navigate('Inicio')} } arrow/>
      <View style={{flex: 1, padding: 16, backgroundColor:'white'}}>
        <ScrollView>
          <BlogCard/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Blog;