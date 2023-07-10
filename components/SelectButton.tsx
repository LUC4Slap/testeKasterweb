import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Color, Spacing, Subtitle } from "../styles";

type ISelectButton = {
    button: () => void;
    title: string;
    hint: string;
};
export const SelectButton = ({ button, title, hint }: ISelectButton) => {
    return (
        <>
            <Text style={[Subtitle[3], styles.selectButtonText]}>{title}</Text>
            <TouchableOpacity style={styles.selectButton} onPress={button}>
                <Text style={[Subtitle[3]]}>{hint}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
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
    }
});