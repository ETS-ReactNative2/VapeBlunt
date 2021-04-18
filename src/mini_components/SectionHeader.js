import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../assets";

const SectionHeader = (props) => {
    const { title = "" } = props;
    return (
        <View style={styles.sectionHeader}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
            <Text
                style={{ color: colors.lightgreen, fontSize: 16 }}
                accessibilityRole="button"
                onPress={props.onPress}
            >
                Ver todo
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default SectionHeader;
