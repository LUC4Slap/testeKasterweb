import React from "react";
import { Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { BasicButton, InputErrorText, InputLabelWrapper, InputWithIconAndClear, SelectButton } from "../../components";
import { User, RealmContext } from "../../frameworks/realm/context";
const { useQuery } = RealmContext;
import { GetPriceTable, GetSellers, INewClient, RegisterNewClient } from "../../frameworks/web/axios/NewClient.routes";
import { Color, Spacing } from "../../styles";
import { CPFMask, DateMask, isCPFValid, isEmailValid, PhoneMask, setDateFromIntegers, splitUserInput } from "../../utils/helpers";
import { Container, SelectGender } from "./Components";
import { RootTabParamList } from "./NewClientTabs";
import { ItemsList, ListItem, SelectItem } from "./SelectItem";

//TODO: FIX TYPING OF NAVIGATION
type Props = BottomTabScreenProps<RootTabParamList, 'Pessoa Física'>;
export const Customer = ({ navigation }: Props) => {
    const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors }
    } = useForm<INewClient>({
        defaultValues: {
            ...template,
            empresa_id: user!.current_company_id,
        }
    });

    const inputRefs = React.useRef<any>([]);
    const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

    const doRequest = (data: INewClient) => {
        const data_nascimento = getUnixDate(data.data_nascimento);
        RegisterNewClient({ ...data, data_nascimento })
            .then(() => Alert.alert('Sucesso', 'Novo cliente cadastrado.'))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
            .finally(() => reset());
    };

    const [vendedor, setVendedor] = React.useState(false);
    const [tabelaPreco, setTabelaPreco] = React.useState(false);

    const [sellers, setSellers] = React.useState([]);
    React.useEffect(() => {
        GetSellers({ empresa_id: user!.current_company_id || 0 })
            .then(res => setSellers(res.data))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'));
    }, []);

    const [priceTables, setPriceTables] = React.useState([]);
    React.useEffect(() => {
        GetPriceTable({ empresa_id: user!.current_company_id || 0 })
            .then(res => setPriceTables(res.data))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'));
    }, []);

    return (
        <Container>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Nome completo' marginTop={28}>
                        <InputWithIconAndClear
                            input={value}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="Lorem ipsum"
                            onBlur={onBlur}
                            clearFn={() => setValue('nome_completo', '')}
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
                            ref={element => (inputRefs.current[0] = element)}
                            input={value}
                            onBlur={onBlur}
                            keyboardType='email-address'
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="email@email.com"
                            clearFn={() => setValue('email', '')}
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
                            ref={element => (inputRefs.current[1] = element)}
                            input={PhoneMask(value)}
                            keyboardType='phone-pad'
                            onBlur={onBlur}
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="(00) 9 0000-0000"
                            clearFn={() => setValue('celular', '')}
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
                rules={{ required: true, validate: output => isCPFValid(output) }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='CPF' marginTop={16}>
                        <InputWithIconAndClear
                            ref={element => (inputRefs.current[2] = element)}
                            input={CPFMask(value)}
                            onBlur={onBlur}
                            keyboardType='number-pad'
                            clearIcon={value.length > 0 ? true : false}
                            placeholder="000.000.000-00"
                            clearFn={() => setValue('cpf_cnpj', '')}
                            setInput={text => onChange(text.replace(/\D/g, ''))}
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
                    text="CPF inválido." />
            )}

            <Controller
                control={control}
                rules={{ required: true, minLength: 10 }}
                render={({ field: { value, onChange, onBlur } }) => (
                    <InputLabelWrapper label='Data de Nascimento' marginTop={16}>
                        <InputWithIconAndClear
                            ref={element => (inputRefs.current[3] = element)}
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
            <SelectButton
                button={() => setTabelaPreco(true)}
                title='Tabela Preço'
                hint={(getValues('tabela_preco_id') || -1) > -1 ? getValues('tabela_preco_id')!.toString() : 'Toque aqui par selecionar'}
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
            <SelectItem
                screenTitle="Selecionar Tabela de Preço"
                isVisible={tabelaPreco}
                setVisible={() => setTabelaPreco(false)}>
                <ItemsList
                    data={priceTables}
                    renderItem={({ item }) =>
                        <ListItem
                            name={item.nome}
                            code={item.id}
                            onPress={() => {
                                setValue('tabela_preco_id', parseInt(item.id));
                                setTabelaPreco(false);
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
const template: INewClient = {
    tipo_pessoa: "f",
    nome_completo: 'Bjarne Stroustrup',
    email: 'bjarnestroustup@cplusplus.com',
    data_nascimento: '00/00/0000',
    celular: '(31) 9 9652-4635',
    cpf_cnpj: '03514831017',
    tabela_preco_id: -1,
    vendedor_id: -1,
    tipo: "C",
    sexo: "M",
    empresa_id: 0
};