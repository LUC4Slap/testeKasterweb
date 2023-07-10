import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { OrderStackParamList } from "./NewOrderStacks";
import { HeaderArrow } from "../novo-cliente/Components";
import { Color, Spacing } from "../../styles";
import { BasicButton, Filter, InputWithIconAndClear, NoResultFound } from "../../components";
import { Container, FilterSubHeader, ItemRow, Separator } from "./Components";
import { User, RealmContext, Product } from "../../frameworks/realm/context";
import { Results } from "realm";
import { OrderContext } from "./OrderProvider";
const { useQuery } = RealmContext;


type Props = NativeStackScreenProps<OrderStackParamList, 'ProdutosNovoPedido'>;
export const ProductsNewOrder = ({ navigation }: Props) => {
    const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
    const products: Results<Product> | undefined = useQuery(Product).filtered('empresa_id == $0', user!.current_company_id);

    // const selectedProducts = useContext(OrderContext);

    return (
        <Container>
            <HeaderArrow
                text='Produtos'
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()} />

            <InputWithIconAndClear
                input={""}
                // setInput={text => setInput(text)}
                setInput={text => undefined}
                placeholder="Buscar"
                leftIcon={true}
                // clearIcon={input.length > 0 ? true : false}
                clearIcon={true}
                // clearFn={clearFn}
                clearFn={() => undefined}
                marginHorizontal={Spacing[16]}
                marginTop={Spacing[16]}
            />

            <Filter
                chipsData={filterChipsMock}
                // index={index}
                index={0}
                arrowDown={true}
                // setIndex={updateIndex} onPress={(_id: number) => undefined} />
                setIndex={() => undefined} onPress={(_id: number) => undefined} />

            <FilterSubHeader
                length={0} onPress={() => {
                    // setFilter('nome CONTAINS [c] ""');
                    // setIndex(0);
                }}
            />
            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<NoResultFound />}
                ItemSeparatorComponent={Separator}
                style={{ paddingHorizontal: Spacing[24] }}
                renderItem={({ item }) =>
                    <ItemRow
                        name={item.nome}
                        quantity={item.estoque}
                        total={item.preco}
                        // onPress={() => navigation.navigate('SelecionarProduto', { productId: item.id })}
                        onPress={() => undefined}
                    />}
            />

            <BasicButton
                text={`Ver Produtos no Pedido`}
                colorText={Color.primary.royalBlue}
                colorButton={Color.primary.riptide}
                marginHorizontal={Spacing[16]}
                marginTop={16}
                // onPress={() => navigation.navigate('PedidoCarrinho')} />
                onPress={() => undefined} />

            <BasicButton
                text='Resumo do Pedido'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginTop={Spacing[8]}
                marginBottom={28}
                // onPress={() => navigation.navigate('ResumoDoPedido')}
                onPress={() => undefined}
            />
        </Container>
    );
};

export const filterChipsMock = [
    { id: 0, text: 'Todos' },
    { id: 1, text: 'Categorias' },
    { id: 2, text: 'Marca' },
];
