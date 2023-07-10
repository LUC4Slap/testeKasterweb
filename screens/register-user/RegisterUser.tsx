import React from 'react';
import { Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  BasicInput,
  InputErrorText,
  FormTitle,
  FieldTitle,
  BasicButton,
  InputPassword,
  LoadingModal,
} from '../../components';

import {
  CPFMask,
  PhoneMask,
  isCPFValid,
  isEmailValid,
  isCNPJValid,
  CNPJMask,
} from '../../utils/helpers';

import { Spacing } from '../../styles';

import { BottonRow, CancelButton, Container, HasAccount, InputSubtitle, InputSubtitleContainer } from './Components';
import { IRegisterUserForm, RegisterUserDTO, RegisterUserRequest } from '../../frameworks/web/axios/RegisterUser.routes';
import { CommonActions } from '@react-navigation/native';
import { UpdateMode } from 'realm';

import { Company, ICompany, IUser, User, RealmContext } from '../../frameworks/realm/context';
import { RootStackParamList } from '../../App';
const { useRealm } = RealmContext;


type Props = NativeStackScreenProps<RootStackParamList, 'CadastrarUsuario'>;

export const RegisterUser = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IRegisterUserForm>({
    defaultValues: template,
  });

  const inputRefs = React.useRef<any>([]);
  const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

  const [loading, setLoading] = React.useState(false);
  const onSubmit = (data: IRegisterUserForm) => {
    setLoading(true);

    const dataToDTO = RegisterUserDTO(data);
    RegisterUserRequest(dataToDTO, data.cnpj)
      .then(res => {
        const user = res.data.user;
        persistUser({ ...user, isLogged: true });
        persistCompanies(user.empresas);

        goToHome();
      })
      .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
      .finally(() => {
        reset();
        setLoading(false);
      });
  };

  const db = useRealm();
  const persistUser = (user: IUser) => {
    db.write(() => {
      db.create('User', User.generate(user), UpdateMode.Modified);
    });
  };
  const persistCompanies = (companies: Array<ICompany>) => {
    db.write(() => {
      for (const company of companies) {
        db.create('Company', Company.generate(company), UpdateMode.Modified);
      }
    });
  };

  const goToHome = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }));

  return (
    <>
      <LoadingModal state={loading} />
      <Container>
        <FormTitle text="Cadastrar um vendedor" />
        <FieldTitle text="Preencha os seus dados" />
        <InputSubtitleContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <BasicInput
                input={value === -1 ? '' : value.toString()}
                placeholder="Código de Vendedor"
                keyboardType="number-pad"
                setInput={text => onChange(text)}
                onSubmitEditing={() => nextField(0)}
                onBlur={onBlur}
              />
            )}
            name="cod_sistema"
          />
          <InputSubtitle text="Digite o código de vendedor que está no sistema" />
        </InputSubtitleContainer>
        {errors.cod_sistema?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => isCNPJValid(output),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[0] = element)}
              input={CNPJMask(value)}
              placeholder="CNPJ"
              keyboardType="default"
              setInput={text => onChange(text.replace(/\D/g, ''))}
              onSubmitEditing={() => nextField(1)}
              onBlur={onBlur}
            />
          )}
          name="cnpj"
        />
        {errors.cnpj?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.cnpj?.type === 'validate' && (
          <InputErrorText text="CNPJ inválido." />
        )}

        <HasAccount
          onPress={() => navigation.navigate('CadastrarEmpresa')}
          firstSentence="Já cadastrou a empresa?"
          secondSentence="Cadastrar empresa"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[1] = element)}
              input={value}
              placeholder="Nome Completo"
              keyboardType="default"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(2)}
              onBlur={onBlur}
            />
          )}
          name="name"
        />
        {errors.name?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => isCPFValid(output),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[2] = element)}
              input={CPFMask(value)}
              placeholder="CPF"
              keyboardType="numeric"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(3)}
              onBlur={onBlur}
            />
          )}
          name="cpf"
        />
        {errors.cpf?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.cpf?.type === 'validate' && (
          <InputErrorText text="CPF inválido." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 11,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[3] = element)}
              input={PhoneMask(value)}
              placeholder="Celular"
              keyboardType="phone-pad"
              setInput={text => onChange(text.replace(/\D/g, ''))}
              onSubmitEditing={() => nextField(4)}
              onBlur={onBlur}
            />
          )}
          name="celular"
        />
        {errors.celular?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.celular?.type === 'minLength' && (
          <InputErrorText text="Número inválido." />
        )}

        <FieldTitle text="Preencha os seus dados" spacingTop={24} />
        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => isEmailValid(output),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[4] = element)}
              input={value}
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(5)}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.email?.type === 'validate' && (
          <InputErrorText text="E-mail inválido." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputPassword
              ref={element => (inputRefs.current[5] = element)}
              input={value}
              placeholder="Sua Senha"
              autoCapitalize="none"
              keyboardType="default"
              onSubmitEditing={() => nextField(6)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
              marginTop={Spacing[14]}
            />
          )}
          name="password"
        />
        {errors.password?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => output === getValues('password') || false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputPassword
              ref={element => (inputRefs.current[6] = element)}
              input={value}
              placeholder="Confirme sua Senha"
              autoCapitalize="none"
              keyboardType="default"
              onSubmitEditing={handleSubmit(onSubmit)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
              marginTop={Spacing[14]}
            />
          )}
          name="passwordConfirmation"
        />
        {errors.passwordConfirmation?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.passwordConfirmation?.type === 'validate' && (
          <InputErrorText text="As senha precisam ser iguais." />
        )}

        <BottonRow>
          <BasicButton
            text="Cadastrar"
            onPress={handleSubmit(onSubmit)}
            marginTop={8}
          />
          <CancelButton onCancel={() => navigation.goBack()} />
        </BottonRow>
      </Container>
    </>
  );
};

const template: IRegisterUserForm = {
  name: 'Deanna Watson',
  // email: 'gepotey643@cosaxu.com',
  email: 'wisexaj291@covbase.com',
  cpf: '53454753007',
  celular: '(47) 99851-4807',
  password: '123456',
  passwordConfirmation: '123456',
  role: 'Vendedor',
  cod_sistema: 12,
  cnpj: '10097518000149',
  // cnpj: '14453177000158',
};