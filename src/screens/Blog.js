import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
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

  return ( 
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <Header onPress={navigation.goBack} arrow text = {'Blog'} />
      <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
        {
          articles.map((article) => (
            <BlogCard article={article} key={article.handle}/>
          ))
        }
      </View>
    </SafeAreaView> 
  )
}

export default Blog;