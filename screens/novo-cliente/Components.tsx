import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, TextStyle } from "react-native";
import { Icon } from "../../components";

import { Color, Heading, Spacing, Subtitle } from "../../styles";

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement | Element;
}) => <ScrollView style={styles.container}>{children}</ScrollView>;

type ISelectButton = {
    button: () => void;
    title: string;
    hint: string;
};

interface ISelectGender extends Omit<ISelectButton, 'button'> {
    hint2: string,
    button: (touched: 'M' | 'F') => void,
    selected: 'M' | 'F';
};
export const SelectGender = ({ button, title, hint, hint2, selected }: ISelectGender) => {
    return (
        <>
            <Text style={[Subtitle[3], styles.selectButtonText]}>{title}</Text>
            <TouchableOpacity style={styles.selectButton} onPress={() => button('M')}>
                <Text style={[Subtitle[3], styles.selectedColor]}>{hint} {selected === 'M' && " (selecionado)"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectButton} onPress={() => button('F')}>
                <Text style={[Subtitle[3], styles.selectedColor]}>{hint2} {selected === 'F' && " (selecionado)"}</Text>
            </TouchableOpacity>
        </>
    );
};

type IHeaderArrow = {
    text: string;
    colorText: TextStyle['color'];
    colorIcon: TextStyle['color'];
    onPress: () => void;
};
export const HeaderArrow = ({ text, colorText, colorIcon, onPress }: IHeaderArrow) => (
    <View style={styles.headerContainer}>
        <Icon
            name="arrow"
            color={colorIcon}
            size={18}
            onPress={onPress}
        />
        <Text style={[Heading.h1, styles.headerText, { color: colorText }]}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    selectButton: {
        flexDirection: 'row',
        backgroundColor: Color.neutral.wildSand,
        borderRadius: 8,
        paddingLeft: Spacing[16],
        marginHorizontal: Spacing[16],
        paddingRight: Spacing[12],
        paddingVertical: 15,
        maxHeight: 54,
        minHeight: 54,
        alignItems: 'center',
    },
    selectButtonText: {
        marginHorizontal: Spacing[32],
        color: Color.neutral.boulder,
        marginBottom: Spacing[8],
        marginTop: Spacing[16]
    },
    headerContainer: {
        paddingHorizontal: Spacing[16],
        backgroundColor: Color.neutral.white,
        paddingTop: Spacing[24],
        paddingBottom: Spacing[12],
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: { flex: 1, marginLeft: 20, color: Color.neutral.white },
    selectedColor: { color: Color.neutral.black }
});
