import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from 'react-hook-form';

import { OrderStackParamList } from "./NewOrderStacks";
import { BasicButton, InputErrorText, SelectButton } from '../../components';
import { ItemsList, ListItem, SelectItem } from '../novo-cliente/SelectItem';
import { HeaderArrow } from '../novo-cliente/Components';
import { Color, Spacing } from '../../styles';
import { IOrder, OrderContext, OrderDispatchContext } from './OrderProvider';
import { Address, Client, RealmContext, User } from '../../frameworks/realm/context';
import { Container } from './Components';
const { useQuery } = RealmContext;

type Props = NativeStackScreenProps<OrderStackParamList, 'NovoPedido'>;
export const NewOrder = ({ navigation }: Props) => {
    const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
    const clients = useQuery(Client).filtered('empresa_id == $0 && user_id == $1', user!.current_company_id, user!.id);
    const addresses = useQuery(Address).filtered('empresa_id == $0 && cliente_id == $1', user!.current_company_id, user!.id);

    const [clientModal, setClientModal] = useState(false);
    const [addressModal, setAddressModal] = useState(false);

    const order = useContext(OrderContext);
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<IOrder>({ defaultValues: order });

    const dispatch = useContext(OrderDispatchContext);
    const submitOrder = (data: IOrder) => {
        dispatch!({ type: 'new-order', payload: data });
        navigation.navigate('ProdutosNovoPedido');
    };
    return (
        <Container>
            <HeaderArrow
                text='Novo Pedido'
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()} />

            <SelectButton
                button={() => undefined}
                title='Tipo'
                hint={hintOrValue(getValues('type'))} />
            <Controller
                control={control}
                rules={{ required: true }}
                render={() => (
                    <SelectItem
                        screenTitle='Tipo'
                        isVisible={false}
                        setVisible={() => undefined}
                    >
                        <></>
                    </SelectItem>
                )}
                name='type' />

            {errors.type?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}

            <SelectButton
                button={() => setClientModal(true)}
                title='Cliente'
                hint={hintOrValue(getValues('client'))} />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <SelectItem
                        screenTitle='Cliente'
                        isVisible={clientModal}
                        setVisible={() => setClientModal(false)}
                    >
                        <ItemsList
                            data={clients}
                            renderItem={({ item }) =>
                                <ListItem
                                    name={item.nome_completo}
                                    code={item.id}
                                    onPress={() => {
                                        onChange(`${item.id} - ${item.nome_completo}`);
                                        setClientModal(false);
                                    }}
                                />}
                        />
                    </SelectItem>
                )}
                name='client' />

            {errors.client?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}

            <SelectButton
                button={() => undefined}
                title='Pagamento'
                hint={hintOrValue(getValues('payment'))} />
            <Controller
                control={control}
                rules={{ required: true }}
                render={() => (
                    <SelectItem
                        screenTitle='Pagamento'
                        isVisible={false}
                        setVisible={() => undefined}
                    >
                        <></>
                    </SelectItem>
                )}
                name='payment' />

            {errors.payment?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}

            <SelectButton
                button={() => setAddressModal(true)}
                title='Endereço'
                hint={hintOrValue(getValues('address'))} />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <SelectItem
                        screenTitle='Endereço'
                        isVisible={addressModal}
                        setVisible={() => setAddressModal(false)}
                    >
                        <ItemsList
                            data={addresses}
                            renderItem={({ item }) =>
                                <ListItem
                                    name={`${item.logradouro}, ${item.numero} - ${item.cidade} (${item.estado})`}
                                    code={item.id}
                                    onPress={() => {
                                        onChange(`${item.logradouro}, ${item.numero} - ${item.cidade} (${item.estado})`);
                                        setAddressModal(false);
                                    }}
                                />}
                        />
                    </SelectItem>
                )}
                name='address' />

            {errors.address?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}

            <BasicButton
                text='Escolher Produtos'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginBottom={Spacing[14]}
                marginTop={Spacing[24]}
                onPress={handleSubmit(submitOrder)}
            />
        </Container>
    );
};

const hintOrValue = (input: string) => input.length === 0 ? 'Toque aqui para selecionar' : input;
