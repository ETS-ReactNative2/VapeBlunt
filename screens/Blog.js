import * as React from "react";
import Header from "../components/Header";
import { View, Text, SafeAreaView } from "react-native";
import BlogCard from "../components/BlogCard";
import { ScrollView } from "react-native-gesture-handler";
import { loadBlogsCollection, loadNewsCollection } from "../lib/mongodb-server";

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogItems: [],
    };
  }

  componentDidMount() {
    loadBlogsCollection().then((res) => {
      this.setState({ blogItems: res });
    });
  }

  render() { 
    let { navigation } = this.props;
    var { blogItems } = this.state;
    console.log(blogItems)
    return ( 
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Header
          onPress={() => {
            navigation.navigate("Inicio");
          }}
        />
        <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
          <ScrollView>
            {blogItems.map((blog) => {
              return (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  description={blog.description}
                  source={blog.thumbnail}
                />
              );
            })}
            
          </ScrollView>
          </View>
      </SafeAreaView> 
    );
  }
}