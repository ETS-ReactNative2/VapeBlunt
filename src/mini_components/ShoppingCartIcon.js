import * as React from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";

import { colors } from "../assets";

const ShoppingCartIcon = (props) => {
    let image = require("../assets/icons/carritob.png");
    if (props.active) {
        image = require("../assets/icons/carrito.png");
    }
    return (
        <View>
            <View
                style={{
                    justifyContent: "center",
                    aligItems: "center",
                    zIndex: 2000,
                    position: "absolute",
                    backgroundColor: colors.green,
                    borderRadius: 7.5,
                    width: 15,
                    height: 15,
                    right: -5,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: colors.white,
                        fontSize: 12,
                    }}
                >
                    {props.cartItems.length}
                </Text>
            </View>
            <Image
                source={image}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

export default connect(mapStateToProps)(ShoppingCartIcon);
