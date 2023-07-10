import React, { useContext } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from 'react-hook-form';

import { OrderStackParamList } from "./NewOrderStacks";
import { HeaderArrow } from '../novo-cliente/Components';
import { Color, Spacing } from '../../styles';
import { BasicButton, InputErrorText, InputLabelWrapper, InputWithIconAndClear } from '../../components';
import { Container, SummaryRow } from './Components';
import { IOrder, OrderContext, OrderDispatchContext } from './OrderProvider';


type Props = NativeStackScreenProps<OrderStackParamList, 'EditarInputs'>;
export const NewOrderInputs = ({ navigation }: Props) => {
    const order = useContext(OrderContext);

    const {
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors },
        control
    } = useForm<IOrder>({ defaultValues: order });

    const inputRefs = React.useRef<any>([]);
    const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                const obj = new OrderCalculation(value.totalProductsWithDiscount || 0);
                if (name === 'generalDiscountPercentage') {
                    obj.convertPercentageToReais(value.generalDiscountPercentage || 0);
                } else if (name === 'generalDiscountReais') {
                    obj.convertReaisToPercentage(value.generalDiscountReais || 0);
                }
                obj.totalAfterDiscountsAndFee(value.deliveryFee || 0);

                if (obj.generalDiscountReais > 0) setValue('generalDiscountReais', obj.generalDiscountReais);
                if (obj.generalDiscountPercentage > 0) setValue('generalDiscountPercentage', obj.generalDiscountPercentage);
                if (obj.total >= 0) setValue('total', obj.total);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    React.useEffect(() => {
        const obj = new OrderCalculation(getValues('totalProductsWithDiscount') || 0);
        obj.convertPercentageToReais(getValues('generalDiscountPercentage'));
        obj.totalAfterDiscountsAndFee(getValues('deliveryFee'));

        if (obj.total > 0) setValue('total', obj.total);
    }, []);

    const dispatch = useContext(OrderDispatchContext);
    const submitEdit = (data: IOrder) => {
        dispatch!({ type: 'edit-order-discounts', payload: data });
        navigation.goBack();
    };
    return (
        <Container>
            <HeaderArrow
                text='Editar'
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                onPress={() => navigation.goBack()}
            />

            <Controller
                control={control}
                rules={{ required: true, validate: input => input > -1 && input <= 100 ? true : false }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Desconto Geral (%)' marginTop={28}>
                        <InputWithIconAndClear
                            input={value.toString()}
                            setInput={text => onChange(text)}
                            clearIcon={value.toString().length > 0 ? true : false}
                            placeholder="0"
                            onBlur={onBlur}
                            keyboardType='number-pad'
                            clearFn={() => onChange('')}
                            onSubmitEditing={() => nextField(0)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='generalDiscountPercentage' />
            {errors.generalDiscountPercentage?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.generalDiscountPercentage?.type === 'validate' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Digite um valor de 0 até 100." />
            )}

            <Controller
                control={control}
                rules={{ required: true, validate: input => input > -1 && input <= getValues('totalProductsWithoutDiscount') ? true : false }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Desconto Geral (R$)' marginTop={28}>
                        <InputWithIconAndClear
                            ref={element => (inputRefs.current[0] = element)}
                            input={value.toString()}
                            clearIcon={value.toString().length > 0 ? true : false}
                            setInput={text => onChange(text)}
                            placeholder="0"
                            keyboardType='number-pad'
                            onBlur={onBlur}
                            clearFn={() => onChange('')}
                            onSubmitEditing={() => nextField(1)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='generalDiscountReais' />
            {errors.generalDiscountReais?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.generalDiscountReais?.type === 'validate' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Digite um valor de 0 até total dos produtos." />
            )}

            <Controller
                control={control}
                rules={{ required: true, validate: input => input < 0 ? false : true }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Frete (R$)' marginTop={28}>
                        <InputWithIconAndClear
                            ref={element => (inputRefs.current[1] = element)}
                            input={value.toString()}
                            clearIcon={value.toString().length > 0 ? true : false}
                            placeholder="0"
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
                name='deliveryFee' />
            {errors.deliveryFee?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.deliveryFee?.type === 'validate' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Digite um valor maior ou igual a zero." />
            )}

            <SummaryRow
                header='Valor Total dos Produtos (R$)'
                subheader={`R$ ${order.totalProductsWithDiscount}`}
                edit={false}
                marginTop={Spacing[16]}
                marginHorizontal={Spacing[16]}
            />
            <SummaryRow
                header='Total do Pedido (R$)'
                subheader={`R$ ${watch('total')}`}
                edit={false}
                marginTop={Spacing[16]}
                marginHorizontal={Spacing[16]}
            />

            <BasicButton
                text='Salvar Alteração'
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginBottom={Spacing[24]}
                marginTop={Spacing[24]}
                onPress={handleSubmit(submitEdit)}
            />
        </Container>
    );
};

export class OrderCalculation {
    total: number = 0;
    generalDiscountReais: number = 0;
    generalDiscountPercentage: number = 0;
    productsTotal: number;

    constructor(_productsTotal: number) {
        this.productsTotal = _productsTotal;
    }

    totalAfterDiscountsAndFee(deliveryFee: number = 0) {
        const result = Number(deliveryFee) + this.generalDiscountOnProducts();
        this.total = Number(result.toFixed(2));
        return result;
    }

    generalDiscountOnProducts() {
        const result = this.productsTotal - this.generalDiscountReais;
        return result;
    }

    convertPercentageToReais(percentage: number) {
        const reais = (percentage / 100) * this.productsTotal;
        if (percentage > 100) {
            this.generalDiscountReais = 0;
            return 0;
        } else if (percentage < 0) {
            this.generalDiscountReais = 0;
            return 0;
        } else {
            this.generalDiscountReais = Number(reais.toFixed(2));
            this.generalDiscountPercentage = percentage;
        }
    }

    convertReaisToPercentage(reais: number) {
        const percentage = (reais / this.productsTotal) * 100;
        if (percentage > 100) {
            this.generalDiscountPercentage = 0;
            return 0;
        } else if (percentage < 0) {
            this.generalDiscountPercentage = 0;
            return 0;
        } else {
            this.generalDiscountPercentage = Number(percentage.toFixed(2));
            this.generalDiscountReais = reais;
            return percentage;
        }
    }
}