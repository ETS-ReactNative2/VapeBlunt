import * as React from "react";
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    Linking,
    StyleSheet,
} from "react-native";

let image = Image.resolveAssetSource(
    require("../assets/images/PromoImage.png")
);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").width * (image.height / image.width);

function PromoBlog(props) {
    const {
        title,
        image,
        url, //open url on browser with RN linking library
    } = props.article;

    const img = { uri: image };

    return (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <View style={styles.containerStyle}>
                <ImageBackground source={img} style={styles.imageStyle}>
                    <Text style={styles.textStyle}>{title}</Text>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: "row",
    },
    imageStyle: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: width,
        height: height,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#000000bf",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        bottom: "-33%",
        left: "-1%",
        paddingLeft: 10,
    },
});

export default PromoBlog;
