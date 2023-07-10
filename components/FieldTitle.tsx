import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Subtitle, Color, Spacing} from '../styles';
const FieldTitle = ({
  text,
  spacingTop,
}: {
  text: string;
  spacingTop?: number;
}) => (
  <Text
    style={[
      Subtitle[2],
      styles.fieldTitle,
      {marginTop: spacingTop ? spacingTop : Spacing[40]},
    ]}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  fieldTitle: {color: Color.neutral.white},
});

export {FieldTitle};
