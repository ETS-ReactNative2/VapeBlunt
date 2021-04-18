import * as React from "react";
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    View,
    StyleSheet,
    Text,
} from "react-native";
import { productInfo } from "../shopify/products";

let defaultImage = Image.resolveAssetSource(
    require("../assets/images/PromoImage.png")
);
const width = Dimensions.get("window").width;
const height =
    Dimensions.get("window").width * (defaultImage.height / defaultImage.width);

function PromoImage(props) {
    const { navigation } = props;
    const [product, setProduct] = React.useState();

    React.useEffect(() => {
        productInfo(props.handle).then(setProduct);
    }, []);

    console.log(product);
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            {product ? (
                <View style={styles.containerStyle}>
                    <ImageBackground
                        source={{ uri: product.image }}
                        style={styles.imageStyle}
                    >
                        <Text style={styles.textStyle}>
                            Nuevo {product.title}
                        </Text>
                    </ImageBackground>
                </View>
            ) : null}
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
        padding: 0,
    },
    textStyle: {
        color: "#84e315",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "#000",
        bottom: "-40%",
        left: "-6%",
    },
});

export default PromoImage;
