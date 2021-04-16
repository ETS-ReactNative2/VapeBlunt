import * as React from "react";
import { View, TouchableOpacity, Image, Text, TextInput } from "react-native";

const colors = require("../assets/colors");

//Header which can be given props like text, searchBar (bool), arrow (bool),
//color (background color). If arrow is false hamburguer icon will be shown
//icons colors adjust to background color
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.renderMiddle = this.renderMiddle.bind(this);
        this.renderSearchIcon = this.renderSearchIcon.bind(this);
    }

    toggleSearchBar = () => {
        this.setState((prevState) => ({ searching: !prevState.searching }));
    };

    renderMiddle = () => {
        let { text } = this.props;
        let { searching } = this.state;

        if (!searching && text) {
            return (
                <Text
                    style={{
                        flex: 1,
                        fontWeight: "bold",
                        fontSize: 23,
                        color: colors.white,
                        textAlign: "center",
                    }}
                >
                    {text}
                </Text>
            );
        } else if (searching) {
            return (
                <TextInput
                    onBlur={() => this.toggleSearchBar()}
                    placeholder=" Buscar..."
                    style={{
                        flex: 1,
                        fontSize: 17,
                        backgroundColor: colors.white,
                        marginVertical: 10,
                        paddingVertical: 0,
                        borderRadius: 20,
                    }}
                    autoFocus={true}
                />
            );
        } else {
            return <View style={{ flex: 1 }} />;
        }
    };

    renderSearchIcon = () => {
        let { searchBar } = this.props;
        if (searchBar) {
            return (
                <TouchableOpacity
                    onPress={() => this.toggleSearchBar()}
                    style={{ alignItems: "center" }}
                >
                    <Image
                        style={{ height: 23, width: 23, marginLeft: 10 }}
                        source={require("../assets/icons/search_white.png")}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            );
        }
    };

    render() {
        let { arrow, onPress } = this.props;
        let color = this.props.color || "black";
        let image = require("../assets/icons/hamburger.png");
        if (arrow) {
            image = require("../assets/icons/BackArrow.png");
        }
        if (
            arrow &&
            (color == "transparent" ||
                color == "white" ||
                color == colors.lightgrey)
        ) {
            image = require("../assets/icons/BackArrowBlack.png");
        }
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 50,
                    backgroundColor: color,
                    paddingHorizontal: 10,
                }}
            >
                <TouchableOpacity
                    onPress={() => onPress()}
                    style={{ alignItems: "center" }}
                >
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                {this.renderMiddle()}
                {this.renderSearchIcon()}
            </View>
        );
    }
}
