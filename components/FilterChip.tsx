import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from './Icon';

import {Color, Spacing, Body} from '../styles';

const FilterChip = ({
  index,
  currentIndex,
  text,
  setIndex,
  arrowDown,
}: {
  index: number;
  currentIndex: number;
  text: string;
  setIndex: () => void;
  arrowDown?: boolean;
}) => (
  <TouchableOpacity
    style={[
      index === currentIndex
        ? filterChipTextSelected
        : filterChipTextDeselected,
      index === 0 || arrowDown === undefined
        ? paddingHorizontal8
        : paddingWithArrow,
      styles.filterChipButton,
    ]}
    onPress={setIndex}>
    <Text
      style={[
        Body.small,
        styles.filterChipText,
        index === currentIndex ? textSelected : textDeselected,
      ]}>
      {text}
    </Text>
    {index !== 0 && arrowDown && (
      <Icon
        name="arrow"
        size={14}
        color={
          index === currentIndex ? Color.neutral.white : Color.primary.royalBlue
        }
        style={styles.arrowIcon}
      />
    )}
  </TouchableOpacity>
);

const filterChipTextSelected = {
    backgroundColor: Color.primary.royalBlue,
  },
  filterChipTextDeselected = {
    backgroundColor: Color.neutral.white,
    borderWidth: 1,
    borderColor: Color.primary.royalBlue,
  },
  textSelected = {color: Color.neutral.white},
  textDeselected = {color: Color.primary.royalBlue},
  paddingHorizontal8 = {paddingHorizontal: Spacing[8]},
  paddingWithArrow = {paddingLeft: Spacing[12], paddingRight: Spacing[8]};

const styles = StyleSheet.create({
  filterChipText: {
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  filterChipButton: {
    height: 24,
    borderRadius: 100,
    paddingVertical: Spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing[8],
  },
  arrowIcon: {marginLeft: Spacing[8], transform: [{rotate: '270deg'}]},
});

export {FilterChip};
