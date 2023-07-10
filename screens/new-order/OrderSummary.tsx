import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { RootStackParamList } from "../../App";
import { OrderStackParamList } from "./NewOrderStacks";
import { HeaderArrow } from "../novo-cliente/Components";
import { BasicButton } from "../../components";
import { Container, Separator, SummaryRow } from "./Components";
import { OrderContext } from "./OrderProvider";
import { Color, Spacing } from "../../styles";

type IParentRoot = Pick<RootStackParamList, "Pedidos">;
type Props = NativeStackScreenProps<OrderStackParamList & IParentRoot, 'ResumoDoPedido'>;
export const OrderSummary = ({ navigation }: Props) => {
    const orderCtx = useContext(OrderContext);

    useFocusEffect(
        React.useCallback(() => {
            setOrder(orderCtx);
        }, [orderCtx])
    );

    const [order, setOrder] = React.useState({});
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setOrder({});
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            <HeaderArrow
                text='Resumo'
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()}
            />

            {Object.keys(order).length > 0 && (
                <ScrollView style={{ flex: 1, paddingHorizontal: Spacing[16] }}>
                    <SummaryRow header='Tipo' subheader={orderCtx.type} onPress={() => navigation.navigate('NovoPedido')} marginTop={Spacing[20]} />
                    <Separator />
                    <SummaryRow header='Cliente' subheader={orderCtx.client} onPress={() => navigation.navigate('NovoPedido')} />
                    <Separator />
                    <SummaryRow header='Pagamento' subheader={orderCtx.payment} onPress={() => navigation.navigate('NovoPedido')} />
                    <Separator />
                    <SummaryRow header='Endereço' subheader={orderCtx.address} onPress={() => navigation.navigate('NovoPedido')} />
                    <Separator />
                    <SummaryRow header='Produtos' subheader={`Total: ${orderCtx.products.length}`} onPress={() => navigation.navigate('PedidoCarrinho')} />
                    <Separator />
                    <SummaryRow header='Desconto Geral (%)' subheader={orderCtx.generalDiscountPercentage.toString()} onPress={() => navigation.navigate('EditarInputs')} />
                    <Separator />
                    <SummaryRow header='Desconto Geral (R$)' subheader={orderCtx.generalDiscountReais.toString()} onPress={() => navigation.navigate('EditarInputs')} />
                    <Separator />
                    <SummaryRow header='Valor Total dos Produtos (R$)' subheader={orderCtx.totalProductsWithDiscount.toString()} onPress={() => undefined} edit={false} />
                    <Separator />
                    <SummaryRow header='Frete' subheader={`R$ ${orderCtx.deliveryFee.toString()}`} onPress={() => navigation.navigate('EditarInputs')} />
                    <Separator />
                    <SummaryRow header='Total do Pedido' subheader={`R$ ${orderCtx.total.toString()}`} onPress={() => undefined} edit={false} />
                </ScrollView>
            )}

            <BasicButton
                text='Gerar Pedido'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginTop={Spacing[24]}
                marginBottom={28}
                onPress={() => navigation.navigate('Pedidos')}
            />
        </Container>
    );
};