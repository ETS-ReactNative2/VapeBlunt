import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

//Every page of the carousel must be a view
//Not very reactive
const Carousel = (props) => {
    const { children } = props;
    const { height = 200 } = props;
    const { onPageChange = () => {} } = props;
    const scrollViewRef = React.useRef(null);
    const [selfWidth, setSelfWidth] = React.useState(0);
    const length = () => React.Children.count(children);

    function setSelectedImageIndex(event) {
        const { x } = event.nativeEvent.contentOffset;
        //selected page index
        const index = Math.round(x / selfWidth);
        onPageChange(index);
    }

    function onLayout(event) {
        let { width } = event.nativeEvent.layout;
        if (width !== selfWidth) {
            setSelfWidth(width);
        }
    }

    //Cant provide height directly to scrollview so we gotta use a view as wrapper
    return (
        <View
            onLayout={onLayout}
            style={{ height: height, alignSelf: "stretch", ...props.style }}
        >
            <ScrollView
                style={{
                    alignSelf: "stretch",
                    ...props.containerStyle,
                }}
                contentContainerStyle={{
                    ...style.scrollViewContainer,
                    width: selfWidth * length(),
                    height: height,
                }}
                horizontal
                pagingEnabled
                ref={scrollViewRef}
                onMomentumScrollEnd={setSelectedImageIndex}
                showsHorizontalScrollIndicator={false}
            >
                {children.map(
                    (child, i) =>
                        child &&
                        React.cloneElement(child, {
                            style: { ...child.props.style, width: selfWidth },
                            key: "a" + i,
                        })
                )}
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: "transparent", ////
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Carousel;
