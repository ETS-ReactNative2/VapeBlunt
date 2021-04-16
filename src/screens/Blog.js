import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView, BlogCard } from "../components";

import { getArticles } from "../shopify/articles";

const Blog = (props) => {
    const { navigation } = props;
    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        getArticles({ first: 20 }).then(setArticles);
    }, []);

    //Delete articles from 2014 and back
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
        >
            <FlatList
                data={articles}
                keyExtractor={(item, i) => item.handle + i}
                renderItem={({ item }) => <BlogCard article={item} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Blog;
