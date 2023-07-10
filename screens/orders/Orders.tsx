import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import {
  Header,
  Filter,
  InputWithIconAndClear,
  BasicButton,
  NoResultFound,
} from '../../components';
import { Color, Spacing } from '../../styles';
import { Container, filterChipsMock, OrderListRow, OrdersListHeader, ordersMock, Separator } from './Components';

type Props = NativeStackScreenProps<RootStackParamList, 'Pedidos'>;
export function Orders({ navigation }: Props) {
  const goBack = () => navigation.goBack();
  const infoModal = () => undefined;

  const [input, setInput] = React.useState('');
  const clearFn = () => setInput('');

  const goToDetails = (item: any) =>
    // navigation.navigate('PedidoDetalhes', { order: item });
    navigation.navigate('PedidoDetalhes');

  const [index, setIndex] = React.useState(0);
  const updateIndex = (filterIndex: number) => setIndex(filterIndex);

  return (
    <Container>
      <Header
        text="Pedidos"
        infoIcon={true}
        leftIconFn={goBack}
        infoIconFn={infoModal}
      />
      <InputWithIconAndClear
        input={input}
        setInput={text => setInput(text)}
        placeholder="Buscar"
        leftIcon={true}
        clearIcon={input.length > 0 ? true : false}
        clearFn={clearFn}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[16]}
      />
      <Filter
        chipsData={filterChipsMock}
        index={index}
        setIndex={updateIndex} onPress={(_id: number) => undefined} />
      <OrdersListHeader />
      <FlatList
        data={ordersMock}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OrderListRow order={item} goToDetails={() => goToDetails(item)} />
        )}
        ItemSeparatorComponent={() => <Separator />}
        ListEmptyComponent={<NoResultFound />}
        showsVerticalScrollIndicator={false}
      />
      <BasicButton
        text="Novo Pedido"
        colorText={Color.primary.riptide}
        colorButton={Color.primary.royalBlue}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[32]}
        marginBottom={Spacing[14]}
        onPress={() => navigation.navigate('NavegadorPedido')}
      />
    </Container>
  );
}
