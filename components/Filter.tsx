import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon } from './Icon';
import { FilterChip } from './FilterChip';

import { Color, Spacing, Body } from '../styles';
import { FlatList } from 'react-native-gesture-handler';

const Filter = ({
  chipsData,
  index,
  setIndex,
  arrowDown,
  onPress
}: {
  chipsData: Array<{ id: number; text: string; }>;
  index: number;
  setIndex: (id: number) => void;
  arrowDown?: boolean;
  onPress: (id: number) => void;
}) => (
  <View style={styles.filterContainer}>
    <Text style={[Body.small, { color: Color.neutral.boulder }]}>Filtros</Text>
    <Icon
      name="filter"
      size={18}
      color={Color.neutral.boulder}
      style={styles.filterIcon}
    />
    <FlatList
      data={chipsData}
      keyExtractor={item => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) =>
        <FilterChip
          key={item.id}
          index={item.id}
          currentIndex={index}
          setIndex={() => {
            setIndex(item.id);
            onPress(item.id);
          }}
          text={item.text}
          arrowDown={arrowDown}
        />
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.neutral.white },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing[16],
    paddingVertical: Spacing[14],
    alignItems: 'center',
  },
  separator: {
    borderWidth: 1,
    borderColor: Color.neutral.mercury,
    marginHorizontal: Spacing[32],
    marginVertical: Spacing[20],
  },
  filterIcon: { marginLeft: Spacing[12], marginRight: Spacing[14] },
  filterOptionsScroll: { flex: 1 },
  orderListCleanFilterContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing[24],
    marginTop: Spacing[16],
    marginBottom: Spacing[20],
  },
  orderListCleanFilterContainerHeader1: {
    color: Color.primary.royalBlue,
    flex: 1,
  },
  orderListRowSubtitleContainer: { flexDirection: 'row', marginTop: Spacing[14] },
  orderListSubtitle1: { color: Color.neutral.boulder, flex: 1 },
  orderListSubtitle2: {
    color: Color.neutral.boulder,
    flex: 2,
    textAlign: 'center',
  },
  orderListRowButton: { marginHorizontal: Spacing[24], flexDirection: 'row' },
  orderListRowIcon: { alignSelf: 'center', transform: [{ rotate: '180deg' }] },
  orderListRowValuesContainer: { flexDirection: 'row', marginTop: Spacing[4] },
  orderListRowValue1: { color: Color.neutral.black, flex: 1 },
  orderListRowValue2: {
    color: Color.neutral.black,
    flex: 2,
    textAlign: 'center',
  },
  flexOne: { flex: 1 },
  orderListRowButtonHeader: { flexDirection: 'row', alignItems: 'center' },
  orderListRowButtonHeaderText: { color: Color.neutral.black, flex: 1 },
});

export { Filter };
