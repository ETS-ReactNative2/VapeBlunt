import React from "react";
import { ScrollView, Text } from "react-native";
import {
    SafeAreaView,
    PromoImage,
    PromoProduct,
    PromoBlog,
} from "../components";

import { newProducts, bestSellers } from "../shopify/products";
import { getArticles } from "../shopify/articles";

const Inicio = (props) => {
    const { navigation } = props;
    const [newestProducts, setNewestProducts] = React.useState([]);
    const [bestSellingProducts, setBestSellingProducts] = React.useState([]);
    const [newestArticles, setNewestArticles] = React.useState([]);

    React.useEffect(() => {
        navigation.setOptions({
            title: "",
        }),
            Promise.all([
                newProducts({ first: 2 })
                    .then(setNewestProducts)
                    .catch((err) =>
                        console.log("Error fetching newProducts", err)
                    ),
                bestSellers({ first: 1 })
                    .then(setBestSellingProducts)
                    .catch((err) =>
                        console.log("Error fetching bestSellers", err)
                    ),
                ,
                getArticles({ first: 2 })
                    .then(setNewestArticles)
                    .catch((err) =>
                        console.log("Error fetching getArticles", err)
                    ),
                ,
            ]);
    }, []);

    return newestProducts && newestArticles && bestSellingProducts ? (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            {/* flex: 1 will cause the ScrollView to become un-scrollable, keep flexGrow`*/}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/*   <PromoImage onPress={() => navigation.navigate("Tienda")} />*/}
                {bestSellingProducts.map((item, i) => (
                    <PromoImage
                        key={i}
                        handle={item.handle}
                        navigation={navigation}
                    />
                ))}
                {newestProducts.map((item, i) => (
                    <PromoProduct
                        key={i}
                        handle={item.handle}
                        navigation={navigation}
                    />
                ))}
                {newestArticles.map((item, i) => (
                    <PromoBlog key={i} article={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    ) : (
        <></>
    );
};

export default Inicio;
