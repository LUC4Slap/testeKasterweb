import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";

import { OrderStackParamList } from "./NewOrderStacks";
import { HeaderArrow } from "../novo-cliente/Components";
import { Color, Spacing } from "../../styles";
import { BasicButton, InputErrorText, InputLabelWrapper, InputWithIconAndClear } from "../../components";
import { Container, TotalsRow, TotalsSeparator, TotalsTitle, TotalsTotalRow, TotalsWrapper } from "./Components";
import { IProductCtx, OrderContext, OrderDispatchContext } from "./OrderProvider";
import { ProductCalculations } from "./SelecProduct";

type Props = NativeStackScreenProps<OrderStackParamList, 'EditarProduto'>;
export const EditProduct = ({ navigation, route }: Props) => {
    const { productIdx } = route.params;

    const product = useContext(OrderContext);
    const currentProduct = product.products[productIdx];
    const { watch, handleSubmit, setValue, getValues, formState: { errors }, control } = useForm<IProductForm>({ defaultValues: adaptToForm(currentProduct) });
    const dispatch = useContext(OrderDispatchContext);

    const submitProduct = (data: IProductForm) => {
        dispatch!({ type: 'edit-product', payload: { data: adaptToSubmit(data), idx: productIdx } });
        navigation.goBack();
    };

    const inputRefs = React.useRef<any>([]);
    const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                const obj = new ProductCalculations(Number(value.quantity!) || 0, Number(value.price!) || 0);
                obj.productTotal();
                if (name === 'discountPercentage') {
                    obj.convertPercentageToReais(Number(value.discountPercentage!) || 0);
                } else if (name === 'discountReais') {
                    obj.convertReaisToPercentage(Number(value.discountReais!) || 0);
                } else if (name === 'quantity' || name === 'price') {
                    obj.convertPercentageToReais(Number(value.discountPercentage!) || 0);
                }
                obj.applyDiscount();

                if (obj.quantity > 0) setValue('quantity', obj.quantity.toString());
                if (obj.price > 0) setValue('price', obj.price.toString());
                if (obj.percentageDiscount > 0) setValue('discountPercentage', obj.percentageDiscount.toString());
                if (obj.reaisDiscount > 0) setValue('discountReais', obj.reaisDiscount.toString());
                if (obj.total > 0) setValue('total', obj.total.toString());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <Container>
            <HeaderArrow
                text=''
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()} />

            <Text style={{ textAlign: 'center', color: 'black', height: 36 }}>{currentProduct.id} - {currentProduct.name}</Text>

            <ScrollView style={{ flex: 1 }}>
                <Controller
                    control={control}
                    rules={{ required: true, validate: input => Number(input) <= 0 ? false : true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <InputLabelWrapper label='Quantidade' marginTop={28}>
                            <InputWithIconAndClear
                                input={value}
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder="0"
                                onBlur={onBlur}
                                keyboardType='number-pad'
                                clearFn={() => onChange('')}
                                setInput={text => onChange(text)}
                                onSubmitEditing={() => nextField(0)}
                                marginTop={Spacing[8]}
                                marginBottom={Spacing[8]}
                            />
                        </InputLabelWrapper>
                    )}
                    name='quantity' />
                {errors.quantity?.type === 'required' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Campo obrigatório." />
                )}
                {errors.quantity?.type === 'validate' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Digite um valor maior que zero" />
                )}

                <Controller
                    control={control}
                    rules={{ required: true, validate: input => Number(input) <= 0 ? false : true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <InputLabelWrapper label='Valor Unitário (R$)' marginTop={28}>
                            <InputWithIconAndClear
                                ref={element => (inputRefs.current[0] = element)}
                                input={value}
                                editable={true}
                                clearIcon={value.toString().length > 0 ? true : false}
                                keyboardType='number-pad'
                                placeholder="R$ 2,00"
                                onBlur={onBlur}
                                clearFn={() => onChange('')}
                                setInput={text => onChange(text)}
                                onSubmitEditing={() => nextField(1)}
                                marginTop={Spacing[8]}
                                marginBottom={Spacing[8]}
                            />
                        </InputLabelWrapper>
                    )}
                    name='price' />
                {errors.price?.type === 'required' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Campo obrigatório." />
                )}
                {errors.price?.type === 'validate' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Digite um valor maior que zero" />
                )}

                <Controller
                    control={control}
                    rules={{ required: true, validate: input => Number(input) > -1 && Number(input) <= 100 ? true : false }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <InputLabelWrapper label='Desconto (%)' marginTop={28}>
                            <InputWithIconAndClear
                                input={value}
                                ref={element => (inputRefs.current[1] = element)}
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder="5"
                                keyboardType="number-pad"
                                onBlur={onBlur}
                                clearFn={() => onChange('')}
                                setInput={text => onChange(text)}
                                onSubmitEditing={() => nextField(2)}
                                marginTop={Spacing[8]}
                                marginBottom={Spacing[8]}
                            />
                        </InputLabelWrapper>
                    )}
                    name='discountPercentage' />
                {errors.discountPercentage?.type === 'required' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Campo obrigatório." />
                )}
                {errors.discountPercentage?.type === 'validate' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Digite um valor de 0 até 100." />
                )}

                <Controller
                    control={control}
                    rules={{ required: true, validate: input => Number(input) > -1 && Number(input) <= Number(getValues('total')) ? true : false }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <InputLabelWrapper label='Desconto (R$)' marginTop={28}>
                            <InputWithIconAndClear
                                ref={element => (inputRefs.current[2] = element)}
                                input={value}
                                keyboardType="number-pad"
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder={'R$ 0,10'}
                                onBlur={onBlur}
                                clearFn={() => onChange('')}
                                setInput={text => onChange(text)}
                                onSubmitEditing={() => undefined}
                                marginTop={Spacing[8]}
                                marginBottom={Spacing[8]}
                            />
                        </InputLabelWrapper>
                    )}
                    name='discountReais' />
                {errors.discountReais?.type === 'required' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Campo obrigatório." />
                )}
                {errors.discountReais?.type === 'validate' && (
                    <InputErrorText
                        marginLeft={Spacing[16]}
                        textColor={Color.semantic.froly}
                        text="Digite um valor de 0 até total do produto." />
                )}

                <TotalsWrapper>
                    <TotalsTitle text='Estoque (Litros)' />
                    <TotalsSeparator />
                    <TotalsRow header="Loja" content="50" />
                    <TotalsTotalRow header="Total" content={watch('quantity').toString()} />
                </TotalsWrapper>

                <TotalsWrapper>
                    <TotalsTitle text='Totais' />
                    <TotalsSeparator />
                    <TotalsRow header="Preço Unitário Líquido" content={`R$ ${watch('price')}`} />
                    <TotalsTotalRow header="Preço Total" content={`R$ ${watch('total')}`} />
                </TotalsWrapper>
            </ScrollView>
            <BasicButton
                text='Adicionar ao Pedido'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginBottom={Spacing[24]}
                marginTop={Spacing[24]}
                onPress={handleSubmit(submitProduct)}
            />
        </Container>
    );
};

const adaptToForm = (data: IProductCtx): IProductForm => ({
    id: data.id,
    name: data.nome,
    price: data.preco.toString(),
    total: '0',
    quantity: data.estoque.toString(),
    discountPercentage: '0',
    discountReais: '0'
});

const adaptToSubmit = (data: IProductForm): IProductCtx => ({
    id: data.id,
    nome: data.name,
    name: data.name,
    price: Number(data.price),
    preco: Number(data.price),
    estoque: Number(data.price),
    total: Number(data.total),
    quantity: Number(data.quantity),
    discountPercentage: Number(data.discountPercentage),
    discountReais: Number(data.discountReais)
});

type IProductForm = {
    id: number,
    name: string,
    price: string,
    total: string;
    quantity: string;
    discountPercentage: string;
    discountReais: string;
};