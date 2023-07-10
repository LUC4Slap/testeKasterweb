import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";

import { OrderStackParamList } from "./NewOrderStacks";
import { HeaderArrow } from "../novo-cliente/Components";
import { Color, Heading, Spacing } from "../../styles";
import { BasicButton, InputErrorText, InputLabelWrapper, InputWithIconAndClear } from "../../components";
import { Container, TotalsRow, TotalsSeparator, TotalsTitle, TotalsTotalRow, TotalsWrapper } from "./Components";
import { IProduct, Product, RealmContext } from "../../frameworks/realm/context";
import { IProductCtx, OrderDispatchContext } from "./OrderProvider";
const { useQuery } = RealmContext;

type Props = NativeStackScreenProps<OrderStackParamList, 'SelecionarProduto'>;
export const SelectProduct = ({ navigation, route }: Props) => {
    const { productId } = route.params;
    const product: Product | undefined = useQuery(Product).find((elem: Product) => elem.id === productId);

    const { handleSubmit, watch, control, setValue, reset, getValues, formState: { errors } } = useForm<IProductForm>({ defaultValues: adaptToForm(product || testValues) });
    const dispatch = useContext(OrderDispatchContext);
    const submitProduct = (data: IProductForm) => {
        dispatch!({ type: 'select-product', payload: adaptToSubmit(data) });
        reset();
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
                // console.debug('obj.applyDiscount is: ', obj);
                // console.debug('-----------');

                if (obj.quantity > 0) setValue('quantity', obj.quantity.toString());
                if (obj.price > 0) setValue('price', obj.price.toString());
                if (obj.percentageDiscount > 0) setValue('discountPercentage', obj.percentageDiscount.toString());
                if (obj.reaisDiscount > 0) setValue('discountReais', obj.reaisDiscount.toString());
                if (obj.total > 0) setValue('total', obj.total.toString());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    React.useEffect(() => {
        const obj = new ProductCalculations(Number(getValues('quantity')) || 0, Number(getValues('price')) || 0);
        obj.productTotal();
        obj.convertPercentageToReais(Number(getValues('discountPercentage')) || 0);
        obj.applyDiscount();

        if (obj.total > 0) setValue('total', obj.total.toString());
    }, []);

    return (
        <Container>
            <HeaderArrow
                text=''
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()} />

            <Text style={[Heading.h3, { textAlign: 'center', color: 'black', height: 36 }]}>{product?.id} - {product?.nome}</Text>

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
                                keyboardType='number-pad'
                                onSubmitEditing={() => nextField(0)}
                                onBlur={onBlur}
                                setInput={text => onChange(text)}
                                clearFn={() => onChange('')}
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
                        <InputLabelWrapper label='Valor Unitário' marginTop={28}>
                            <InputWithIconAndClear
                                ref={element => (inputRefs.current[0] = element)}
                                input={value}
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder="R$ 2,00"
                                onBlur={onBlur}
                                keyboardType='number-pad'
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
                                ref={element => (inputRefs.current[1] = element)}
                                input={value}
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder="5"
                                onBlur={onBlur}
                                keyboardType='number-pad'
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
                                clearIcon={value.toString().length > 0 ? true : false}
                                placeholder={'R$ 0,10'}
                                keyboardType='number-pad'
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


const adaptToForm = (data: IProduct): IProductForm => ({
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
    name: data.name,
    nome: data.name,
    price: Number(data.price),
    preco: Number(data.price),
    total: Number(data.total),
    quantity: Number(data.quantity),
    estoque: Number(data.quantity),
    discountPercentage: Number(data.discountPercentage),
    discountReais: Number(data.discountReais),
});
const testValues: IProduct = {
    id: 0,
    nome: '',
    preco: 0,
    estoque: 0,
    sku: "",
    marca_id: 0,
    altura_cm: 0,
    empresa_id: 0,
    grupo_nome: "",
    largura_cm: 0,
    categoria_id: 0,
    peso_kg_bruto: 0,
    comprimento_cm: 0,
    complemento_sem_tags: ""
};

export class ProductCalculations {
    quantity: number;
    price: number;
    percentageDiscount: number = 0;
    reaisDiscount: number = 0;
    total: number = 0;

    constructor(iQuantity: number, iPrice: number) {
        this.quantity = iQuantity;
        this.price = iPrice;
    }

    productTotal() {
        const result = this.quantity * this.price;
        return result;
    }

    convertPercentageToReais(percentage: number) {
        const reais = (Number(percentage) / 100) * this.productTotal();
        if (reais > this.productTotal()) {
            this.reaisDiscount = 0;
            return 0;
        } else if (reais < 0) {
            this.reaisDiscount = 0;
            return 0;
        } else {
            this.reaisDiscount = Number(reais.toFixed(2));
            this.percentageDiscount = Number(percentage);
            return Number(reais.toFixed(2));
        }
    }

    convertReaisToPercentage(reais: number) {
        const percentage = (Number(reais) / this.productTotal()) * 100;
        if (percentage > 100) {
            this.reaisDiscount = 0;
            return 100;
        }
        else if (percentage < 0) {
            this.reaisDiscount = 0;
            this.percentageDiscount = 0;
            return 0;
        } else {
            this.reaisDiscount = reais;
            this.percentageDiscount = Number(percentage.toFixed(2));
            return Number(percentage.toFixed(2));
        }
    }

    applyDiscount() {
        const totalAfterDiscount = this.productTotal() - this.reaisDiscount;
        this.total = Number(totalAfterDiscount.toFixed(2));
        return Number(totalAfterDiscount.toFixed(2));
    }
}

type IProductForm = {
    id: number,
    name: string,
    price: string,
    total: string;
    quantity: string;
    discountPercentage: string;
    discountReais: string;
};