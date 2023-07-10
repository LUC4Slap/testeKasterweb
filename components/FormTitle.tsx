import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Color, Spacing, Heading} from '../styles';

const FormTitle = ({text}: {text: string}) => (
  <Text style={[Heading.h1, styles.formTitle]}>{text}</Text>
);

const styles = StyleSheet.create({
  formTitle: {color: Color.neutral.white, marginTop: Spacing[56]},
});

export {FormTitle};
