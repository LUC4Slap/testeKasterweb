import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { Header } from '../../components';
import { Container, ListHeader, listRow, mockData, Pagination, Separator } from './Components';

type Props = NativeStackScreenProps<RootStackParamList, 'Resumo'>;
export function Summary({ navigation }: Props) {
  const goBack = () => navigation.goBack();
  return (
    <Container>
      <Header text="Resumo" leftIconFn={goBack} />
      <Pagination />
      <ListHeader />
      <Separator />
      <FlatList
        data={mockData}
        renderItem={listRow}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
