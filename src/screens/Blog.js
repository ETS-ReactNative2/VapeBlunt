import * as React from "react";
import Header from "../components/Header";
import { View, Text, SafeAreaView } from "react-native";
import BlogCard from "../components/BlogCard";
import { ScrollView, TouchableOpacity, TouchableNativeFeedback } from "react-native-gesture-handler";
import { getBlogs } from '../shopify/products';

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogItems: [],
    };
  }

  componentDidMount() {
    getBlogs().then((res) => {
      this.setState({ blogItems: res });
    });
  }

  render() { 
    let { navigation } = this.props;
    var { blogItems } = this.state;
    return ( 
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Header onPress={() => { navigation.navigate("Inicio")}} arrow text = {'Blog'}  />
        <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
          <ScrollView>
            {blogItems.slice(0).reverse().map((blog) => {
              return (
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('BlogLeer', {id: blog._id, items: blogItems})}} key={blog._id}>
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  source={blog.thumbnail}
                />
                </TouchableNativeFeedback>
              );
            })}
            
          </ScrollView>
          </View>
      </SafeAreaView> 
    );
  }
}