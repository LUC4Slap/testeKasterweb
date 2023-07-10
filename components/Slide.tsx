import React from 'react';

import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {Color, Heading, Spacing, Subtitle} from '../styles';

const dimension = Dimensions.get('screen');

const Slide = ({item}: any) => (
  <View style={styles.slideContainer}>
    <Text style={[Heading.h1, styles.header]}>{item.header}</Text>
    <Text style={[Subtitle[2], styles.subtitle]}>{item.subtitle}</Text>
    <View style={styles.svgContainer}>{item.svg && item.svg}</View>
  </View>
);

const styles = StyleSheet.create({
  slideContainer: {
    width: dimension.width,
    backgroundColor: Color.neutral.white,
    paddingTop: '9.36%',
  },
  header: {
    color: Color.primary.royalBlue,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: Spacing[8],
    textAlign: 'center',
    color: Color.neutral.mineShaft,
  },
  svgContainer: {
    alignItems: 'center',
  },
});

export {Slide};
