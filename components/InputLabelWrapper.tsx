import React from 'react';
import { Text, View, ViewStyle } from "react-native";

import { Color, Subtitle } from '../styles';

export const InputLabelWrapper = ({ marginTop, label, children }: ILabelWrapper) => {
    return (
        <View style={{ marginTop, marginHorizontal: 16 }}>
            <Text style={[{ marginLeft: 16, color: Color.neutral.boulder }, Subtitle[3]]}>{label}</Text>
            {children}
        </View>
    );
};

type ILabelWrapper = {
    children: React.ReactElement;
    marginTop?: ViewStyle['marginTop'];
    label: string;
};