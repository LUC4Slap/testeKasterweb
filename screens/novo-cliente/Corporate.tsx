import React, { useRef } from "react";
import { Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";


import { GetSellers, ICorporateAPI, RegisterNewClient } from "../../frameworks/web/axios/NewClient.routes";
import { Color, Spacing } from "../../styles";
import { CNPJMask, DateMask, isCNPJValid, isEmailValid, PhoneMask, setDateFromIntegers, splitUserInput } from "../../utils/helpers";
import { BasicButton, InputErrorText, InputLabelWrapper, InputWithIconAndClear, SelectButton } from "../../components";
import { Container, SelectGender } from "./Components";

import { User, RealmContext } from "../../frameworks/realm/context";
import { ItemsList, ListItem, SelectItem } from "./SelectItem";
const { useQuery } = RealmContext;

export const Corporate = () => {
    const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors }
    } = useForm<ICorporateAPI>({
        defaultValues: {
            ...template,
            empresa_id: user!.current_company_id
        }
    });

    const inputRefs = useRef<any>([]);
    const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

    const doRequest = (data: ICorporateAPI) => {
        const data_nascimento = getUnixDate(data.data_nascimento);
        RegisterNewClient({ ...data, data_nascimento })
            .then(() => Alert.alert('Sucesso', 'Novo cliente cadastrado.'))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
            .finally(() => reset());
    };
    const [vendedor, setVendedor] = React.useState(false);

    const [sellers, setSellers] = React.useState([]);
    React.useEffect(() => {
        GetSellers({ empresa_id: user!.current_company_id || 0 })
            .then(res => setSellers(res.data))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'));
    }, []);
    return (
        <Container>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Nome razão' marginTop={28}>
                        <InputWithIconAndClear
                            input={value}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="Lorem ipsum Ltda."
                            clearFn={() => setValue('nome_completo', '')}
                            onBlur={onBlur}
                            setInput={text => onChange(text)}
                            onSubmitEditing={() => nextField(0)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='nome_completo'
            />
            {errors.nome_completo?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}

            <Controller
                control={control}
                rules={{ required: true, validate: output => isEmailValid(output) }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='E-mail' marginTop={16}>
                        <InputWithIconAndClear
                            input={value}
                            ref={element => (inputRefs.current[0] = element)}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="email@email.com"
                            keyboardType="email-address"
                            clearFn={() => setValue('email', '')}
                            onBlur={onBlur}
                            setInput={text => onChange(text)}
                            onSubmitEditing={() => nextField(1)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='email'
            />
            {errors.email?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.email?.type === 'validate' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="E-mail inválido." />
            )}

            <Controller
                control={control}
                rules={{ required: true, minLength: 11 }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Celular/WhatsApp' marginTop={16}>
                        <InputWithIconAndClear
                            input={PhoneMask(value)}
                            ref={element => (inputRefs.current[1] = element)}
                            clearIcon={value.length > 0 ? true : false}
                            keyboardType='phone-pad'
                            placeholder="(00) 9 0000-0000"
                            clearFn={() => setValue('celular', '')}
                            onBlur={onBlur}
                            setInput={text => onChange(text.replace(/\D/g, ''))}
                            onSubmitEditing={() => nextField(2)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='celular'
            />
            {errors.celular?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.celular?.type === 'minLength' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Número inválido de telefone." />
            )}

            <Controller
                control={control}
                rules={{ required: true, validate: output => isCNPJValid(output) }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='CNPJ' marginTop={16}>
                        <InputWithIconAndClear
                            input={CNPJMask(value)}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="00.000.000/0001-00"
                            keyboardType="number-pad"
                            ref={element => (inputRefs.current[2] = element)}
                            clearFn={() => setValue('cpf_cnpj', '')}
                            onBlur={onBlur}
                            setInput={text => onChange(text)}
                            onSubmitEditing={() => nextField(3)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='cpf_cnpj'
            />
            {errors.cpf_cnpj?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.cpf_cnpj?.type === 'validate' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="CNPJ inválido." />
            )}

            <Controller
                control={control}
                rules={{ required: false }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Inscrição Estadual' marginTop={16}>
                        <InputWithIconAndClear
                            input={value}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="001"
                            keyboardType="number-pad"
                            ref={element => (inputRefs.current[4] = element)}
                            clearFn={() => setValue('inscricao_estadual', '')}
                            onBlur={onBlur}
                            setInput={text => onChange(text)}
                            onSubmitEditing={() => nextField(4)}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='inscricao_estadual'
            />

            <Controller
                control={control}
                rules={{ required: true, minLength: 10 }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Data de Nascimento' marginTop={16}>
                        <InputWithIconAndClear
                            ref={element => (inputRefs.current[4] = element)}
                            input={value}
                            onBlur={onBlur}
                            keyboardType='number-pad'
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="00/00/0000"
                            clearFn={() => setValue('data_nascimento', '')}
                            setInput={text => onChange(DateMask(text))}
                            marginTop={Spacing[8]}
                            marginBottom={Spacing[8]}
                        />
                    </InputLabelWrapper>
                )}
                name='data_nascimento'
            />

            {errors.data_nascimento?.type === 'required' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Campo obrigatório." />
            )}
            {errors.data_nascimento?.type === 'minLength' && (
                <InputErrorText
                    marginLeft={Spacing[16]}
                    textColor={Color.semantic.froly}
                    text="Data inválida." />
            )}

            <SelectButton
                button={() => setVendedor(true)}
                title='Vendedor'
                hint={getValues('vendedor_id') > -1 ? getValues('vendedor_id').toString() : 'Toque aqui par selecionar'}
            />

            <SelectItem
                screenTitle="Selecionar Vendedor"
                isVisible={vendedor}
                setVisible={() => setVendedor(false)}>
                <ItemsList
                    data={sellers}
                    renderItem={({ item }) =>
                        <ListItem
                            name={item.name}
                            code={item.id}
                            onPress={() => {
                                setValue('vendedor_id', parseInt(item.id));
                                setVendedor(false);
                            }}
                        />
                    }
                />
            </SelectItem>

            <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                    <SelectGender
                        button={(touched: 'M' | 'F') => onChange(touched)}
                        selected={value}
                        title='Gênero'
                        hint={'Masculino'}
                        hint2={'Feminino'}
                    />
                )}
                name='sexo'
            />
            <BasicButton
                text="Cadastrar"
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginTop={Spacing[32]}
                marginBottom={Spacing[14]}
                onPress={handleSubmit(doRequest)}
            />
        </Container>
    );
};

const getUnixDate = (input: string) => {
    const dateAsInteger = splitUserInput(input);
    const unixDate = setDateFromIntegers(dateAsInteger);
    return unixDate;
};

const template: ICorporateAPI = {
    tipo_pessoa: "j",
    nome_completo: "ACME ltda.",
    email: 'email@newemail.com',
    inscricao_estadual: "",
    celular: '31985462045',
    data_nascimento: "00/00/0000",
    cpf_cnpj: '50362040000151',
    vendedor_id: -1,
    empresa_id: 0,
    tipo: "C",
    sexo: "M",
};
