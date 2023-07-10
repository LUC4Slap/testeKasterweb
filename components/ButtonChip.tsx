import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

import {Color, Spacing, Button} from '../styles';

interface ButtonTypes {
  text: string;
  textColor?: TextStyle['color'];
  backgroundColor?: TextStyle['backgroundColor'];
  marginTop?: TextStyle['marginTop'];
  marginLeft?: TextStyle['marginLeft'];
  alignSelf?: TextStyle['alignSelf'];
  textAlign?: TextStyle['textAlign'];
  onPress?: () => void;
}
const ButtonChip = ({
  text,
  textColor,
  backgroundColor,
  marginTop,
  marginLeft,
  alignSelf,
  textAlign,
  onPress,
}: ButtonTypes) => (
  <Text
    onPress={onPress}
    style={[
      Button.default,
      styles.listHeaderStatus,
      {
        backgroundColor: backgroundColor || Color.primary.riptide,
        color: textColor || Color.neutral.white,
        marginTop: marginTop || 0,
        alignSelf: alignSelf || undefined,
        marginLeft: marginLeft || undefined,
        textAlign: textAlign || undefined,
      },
    ]}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  listHeaderStatus: {
    paddingHorizontal: Spacing[12],
    paddingVertical: 6,
    borderRadius: 100,
  },
});
export {ButtonChip};
