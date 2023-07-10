import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from './Icon';

import { Color, Spacing, Heading } from '../styles';

const Header = ({
  text,
  leftIconFn,
  infoIcon,
  infoIconFn,
  marginBottom,
}: {
  text: string;
  leftIconFn: () => void;
  infoIcon?: boolean;
  infoIconFn?: () => void;
  marginBottom?: ViewStyle['marginBottom'];
}) => (
  <View style={[styles.header, { marginBottom: marginBottom || undefined }]}>
    <Icon
      name="slide"
      color={Color.primary.royalBlue}
      size={24}
      onPress={leftIconFn}
      style={styles.icon}
    />
    <Text style={[Heading.h1, styles.headerText]}>{text}</Text>
    {infoIcon && (
      <Icon
        name="question-mark-circle"
        color={Color.neutral.black}
        size={24}
        onPress={infoIconFn}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: Spacing[16],
    marginTop: Spacing[24],
    alignItems: 'center',
  },
  headerText: { flex: 1, marginLeft: 20, color: Color.neutral.black },
  icon: { padding: Spacing[4] },
});
export { Header };
