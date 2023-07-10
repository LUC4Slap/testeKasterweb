import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from '@react-navigation/native';

import { OrderStackParamList } from "./NewOrderStacks";
import { BasicButton, NoResultFound } from '../../components';
import { Color, Spacing } from '../../styles';
import { HeaderArrow } from '../novo-cliente/Components';
import { Container, ItemRow, Separator, TotalsRow, TotalsSeparator, TotalsTitle, TotalsTotalRow, TotalsWrapper } from './Components';
import { IOrder, OrderContext } from './OrderProvider';

type Props = NativeStackScreenProps<OrderStackParamList, 'PedidoCarrinho'>;
export const OrderCart = ({ navigation }: Props) => {

    const orderCtx = useContext(OrderContext);
    const [order, setOrder] = React.useState<IOrder | {}>({});
    useFocusEffect(
        React.useCallback(() => {
            setOrder(orderCtx);
        }, [orderCtx])
    );

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setOrder({});
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            <HeaderArrow
                text='Produtos no Pedido'
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()}
            />
            {Object.keys(order).length > 0 && (
                <>
                    <FlatList
                        data={orderCtx.products}
                        keyExtractor={(_item, idx) => idx.toString()}
                        ListEmptyComponent={<NoResultFound />}
                        ItemSeparatorComponent={Separator}
                        style={{ paddingHorizontal: Spacing[24], marginTop: Spacing[20] }}
                        renderItem={({ item, index }) =>
                            <ItemRow
                                name={item.name}
                                quantity={item.quantity}
                                total={item.total}
                                onPress={() => navigation.navigate('EditarProduto', { productIdx: index })}
                            />}
                    />

                    <TotalsWrapper>
                        <TotalsTitle text='Totais' />
                        <TotalsSeparator />
                        <TotalsRow header="Itens" content={orderCtx.products.length.toString()} />
                        <TotalsRow header="Subtotal" content={`R$ ${orderCtx.totalProductsWithoutDiscount}`} />
                        <TotalsRow header="Descontos" content={`R$ ${orderCtx.discountReais}`} />
                        <TotalsTotalRow header="Total" content={`R$ ${orderCtx.totalProductsWithDiscount}`} />
                    </TotalsWrapper>
                </>
            )}

            <BasicButton
                text='Voltar'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginBottom={Spacing[24]}
                marginTop={Spacing[24]}
                onPress={() => navigation.goBack()}
            />
        </Container>
    );
};