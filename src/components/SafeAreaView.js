import React from "react";
import { SafeAreaView as SAV, View } from "react-native";

const SafeAreaView = (props) => {
    return (
        <SAV style={{ flex: 1 }}>
            <View style={[{ flex: 1 }, props.style]}>{props.children}</View>
        </SAV>
    );
};

export default SafeAreaView;
