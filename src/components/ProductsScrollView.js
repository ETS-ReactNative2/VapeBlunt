import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ProductCard from "../components/ProductCard";

const ProductsScrollView = (props) => {
    const { products } = props;

    return (
        <FlatList
            numColumns={2}
            columnWrapperStyle={styles.row}
            data={products}
            showsVerticalScrollIndicator={false}
            style={styles.scrollview}
            contentContainerStyle={styles.containerStyle}
            renderItem={({ item, i }) => (
                <ProductCard
                    product={item}
                    style={styles.productCard}
                    key={i}
                />
            )}
            key={"#"}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: "white",
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
    },
    containerStyle: {
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 40,
    },
    productCard: {
        marginBottom: 20,
    },
});

export default ProductsScrollView;
