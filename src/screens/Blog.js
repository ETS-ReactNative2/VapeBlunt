import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Header,
  BlogCard
} from '../components';

import { getArticles } from '../shopify/articles';

const Blog = (props) => {
  const { navigation } = props;
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    getArticles().then(setArticles);
  }, [])

  //Delete articles from 2014 and back
  return ( 
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header onPress={navigation.goBack} arrow text = {'Blog'} />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <FlatList data={articles} keyExtractor={(item, i) => item.handle+i}
          renderItem={({item}) => (
            <BlogCard article={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
        </View>
    </SafeAreaView> 
  )
}

export default Blog;