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

    //Ideally would have this into its own file to import it as needed, but only 2
    //componentes use it so not that big a deal
    const navigateToProductDetail = React.useCallback(() => {
        product && navigation.navigate("Producto", { handle: product.handle });
    }, [product, navigation]);

    return (
        <TouchableOpacity onPress={navigateToProductDetail}>
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
        position: 'relative',
    },
    textStyle: {
        color: "#84e315",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default PromoImage;
