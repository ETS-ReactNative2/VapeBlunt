import * as React from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    Linking,
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

    return (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Image
                source={{ uri: image }}
                style={{ width: width, height: height }}
            />
            <View style={{ marginBottom: 10 }}>
                {/* Title looks ugly like this. Gotta change it later */}
                <Text
                    style={{
                        fontWeight: "bold",
                        paddingLeft: 10,
                        fontSize: 20,
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default PromoBlog;
