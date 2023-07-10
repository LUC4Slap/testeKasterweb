import React from 'react';

import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';

import {Color, Spacing, Button} from './../styles';

interface BasicBtn {
  text: string;
  onPress: () => void;
  colorText?: string;
  colorButton?: string;
  marginHorizontal?: ViewStyle['marginHorizontal'];
  marginTop?: ViewStyle['marginTop'];
  marginBottom?: ViewStyle['marginBottom'];
}

const BasicButton = ({
  text,
  colorText,
  colorButton,
  onPress,
  marginHorizontal,
  marginTop,
  marginBottom,
}: BasicBtn) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      {
        backgroundColor: colorButton || Color.primary.riptide,
        marginHorizontal: marginHorizontal || 0,
        marginTop: marginTop || 0,
        marginBottom: marginBottom || 0,
      },
    ]}>
    <Text
      style={[
        Button.default,
        styles.text,
        {color: colorText || Color.primary.royalBlue},
      ]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    maxHeight: 48,
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: Spacing[16],
  },
  text: {
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
});
export {BasicButton};
