import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "../components";
import { NavigationButton } from "../mini_components";

function Sidemenu(props) {
    const { navigation } = props;
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontSize: 25,
                        color: "white",
                        textAlign: "left",
                        flex: 1,
                    }}
                >
                    MENU
                </Text>
            </View>
            <NavigationButton
                text="Tienda"
                onPress={() => navigation.navigate("Tienda")}
            />
            <NavigationButton
                text="Blog"
                onPress={() => navigation.navigate("Blog")}
            />
            <NavigationButton
                text="Carrito"
                onPress={() => navigation.navigate("Carrito")}
            />

            <Image
                style={styles.image}
                source={require("../assets/images/logo.png")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        paddingHorizontal: 10,
    },
    image: {
        height: 160,
        width: 160,
        marginTop: 20,
        opacity: 0.4,
        alignSelf: "center",
    },
});

export default Sidemenu;
