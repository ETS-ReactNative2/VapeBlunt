import React from "react";
import { ScrollView } from "react-native";
import {
    SafeAreaView,
    PromoImage,
    PromoProduct,
    PromoBlog,
} from "../components";

import { newProducts } from "../shopify/products";
import { getArticles } from "../shopify/articles";

const Inicio = (props) => {
    const { navigation } = props;
    const [newestProduct, setNewestProduct] = React.useState();
    const [newestArticle, seNewestArticle] = React.useState([]);

    React.useEffect(() => {
        navigation.setOptions({
            title: "",
        });
        newProducts(1)
            .then((res) => {
                if (res.length > 0) {
                    setNewestProduct(res.pop()); //Last one
                }
            })
            .catch((err) => {
                console.log("Error fetching products", err);
            });
    }, []);

    React.useEffect(() => {
        getArticles({ first: 1 }).then(seNewestArticle);
    }, []);

    return newestProduct && newestArticle[0] ? (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            {/* flex: 1 will cause the ScrollView to become un-scrollable, keep flexGrow`*/}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <PromoImage onPress={() => navigation.navigate("Tienda")} />
                <PromoProduct
                    handle={newestProduct.handle}
                    navigation={navigation}
                />
                <PromoBlog article={newestArticle[0]} />
            </ScrollView>
        </SafeAreaView>
    ) : (
        <></>
    );
};

export default Inicio;
