import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewOrder } from './NewOrder';
import { ProductsNewOrder } from './ProductsNewOrder';
import { OrderSummary } from './OrderSummary';
import { SelectProduct } from './SelecProduct';
import { OrderCart } from './OrderCart';
import { NewOrderInputs } from './NewOrderInputs';
import { OrderProvider } from './OrderProvider';
import { EditProduct } from './EditProduct';

const Stack = createNativeStackNavigator<OrderStackParamList>();

export const NewOrderNavigator = () => {

    return (
        <OrderProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='NovoPedido' component={NewOrder} />
                <Stack.Screen name='ProdutosNovoPedido' component={ProductsNewOrder} />
                <Stack.Screen name='EditarInputs' component={NewOrderInputs} />
                <Stack.Screen name='SelecionarProduto' component={SelectProduct} />
                <Stack.Screen name='EditarProduto' component={EditProduct} />
                <Stack.Screen name='PedidoCarrinho' component={OrderCart} />
                <Stack.Screen name='ResumoDoPedido' component={OrderSummary} />
            </Stack.Navigator>
        </OrderProvider>
    );
};

export type OrderStackParamList = {
    NovoPedido: undefined,
    SelecionarProduto: { productId: number; },
    EditarProduto: { productIdx: number; },
    ProdutosNovoPedido: undefined,
    PedidoCarrinho: undefined,
    EditarInputs: undefined,
    ResumoDoPedido: undefined;
};