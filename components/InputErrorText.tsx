import React from 'react';

import { StyleSheet, Text, TextStyle } from 'react-native';

import { Color, Spacing, Subtitle } from './../styles';

const InputErrorText = ({
  text,
  textColor,
  marginLeft
}: {
  text: string;
  textColor?: TextStyle['color'];
  marginLeft?: TextStyle['marginLeft'];
}) => (
  <Text
    numberOfLines={2}
    style={[
      Subtitle[3],
      styles.errorText,
      {
        color: textColor ? textColor : Color.neutral.white,
        marginLeft: marginLeft || 0
      },
    ]}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  errorText: {
    paddingHorizontal: Spacing[16],
    color: Color.neutral.white,
    marginTop: Spacing[4],
  },
});

export { InputErrorText };
