import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Color, Heading, Spacing } from "../styles";
import { Icon } from "./Icon";

export const NoResultFound = () => {
    return (
        <View style={styles.container}>
            <Icon
                name="magnifying-glass"
                color={Color.neutral.silver}
                size={60}
                style={styles.center}
            />
            <Text style={[Heading.h2, styles.text]}>Nenhum resultado encontrado.</Text>
        </View>
    );
};

const { height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: { height: height * .56, justifyContent: 'center' },
    text: { textAlign: 'center', marginTop: Spacing[20], color: Color.neutral.silver },
    center: { textAlign: 'center' }
});