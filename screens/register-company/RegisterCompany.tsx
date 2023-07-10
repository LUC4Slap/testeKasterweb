import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { BasicInput, BasicButton, InputErrorText, LoadingModal } from '../../components';

import {
  CNPJMask,
  PhoneMask,
  RegularPhoneMask,
  isCNPJValid,
  isEmailValid,
} from '../../utils/helpers';

import { BottonRow, CancelButton, Container, FieldTitle, FormTitle, OpenImageLibrary } from './Components';
import { AppendForm, RegisterCompanyRequest, RegisterCompanyDTO, IRegisterCompayForm } from '../../frameworks/web/axios/RegisterCompany.routes';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastrarEmpresa'>;
const RegisterCompany = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterCompayForm>({ defaultValues: testValues });

  const [selectedImage, setImage] = React.useState<Asset[] | undefined>(undefined);
  const addImage = () =>
    launchImageLibrary({ mediaType: 'photo' }, response =>
      setImage(response.assets),
    );

  const [loading, setLoading] = React.useState(false);
  const doCompanyRequest = (data: IRegisterCompayForm, enterpriseImage: Asset[] | undefined) => {
    setLoading(true);

    const dataToSend = RegisterCompanyDTO(data, enterpriseImage);
    RegisterCompanyRequest(AppendForm(dataToSend))
      .then(() => {
        //TODO: is any persistance missed here?
        navigation.goBack();
      })
      .catch((err: any) => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
      .finally(() => {
        reset();
        setLoading(false);
      });
  };

  const onSubmit = (data: IRegisterCompayForm) => {
    if (selectedImage === undefined) {
      Alert.alert(
        'Aviso',
        'Nenhuma imagem selecionada para a empresa. Deseja escolher?',
        [
          {
            text: 'Sim',
            onPress: () =>
              addImage().then(response =>
                doCompanyRequest(data, response.assets),
              ),
          },
          {
            text: 'Prosseguir',
            onPress: () => doCompanyRequest(data, undefined),
            style: 'cancel',
          },
        ],
      );
    } else {
      doCompanyRequest(data, selectedImage);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      reset();
      setImage(undefined);
    });
    return unsubscribe;
  }, [navigation, reset, setImage]);

  const onCancel = () => navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    }));

  const inputRefs = useRef<any>([]);
  const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

  return (
    <>
      <LoadingModal state={loading} />
      <Container>
        <FormTitle text="Cadastrar uma empresa" />
        <FieldTitle text="Preencha os dados da empresa" />
        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => isCNPJValid(output),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              input={CNPJMask(value)}
              placeholder="CNPJ"
              keyboardType="numeric"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(0)}
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

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[0] = element)}
              input={value}
              placeholder="Empresa"
              keyboardType="default"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(1)}
              onBlur={onBlur}
            />
          )}
          name="nome_fantasia"
        />
        {errors.nome_fantasia?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: output => isEmailValid(output),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[1] = element)}
              input={value}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              setInput={text => onChange(text)}
              onSubmitEditing={() => nextField(2)}
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
            minLength: 10,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[2] = element)}
              input={
                value.length <= 10 ? RegularPhoneMask(value) : PhoneMask(value)
              }
              placeholder="Telefone"
              keyboardType="phone-pad"
              setInput={text => onChange(text.replace(/\D/g, ''))}
              onSubmitEditing={() => nextField(3)}
              onBlur={onBlur}
            />
          )}
          name="telefone"
        />
        {errors.telefone?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}
        {errors.telefone?.type === 'minLength' && (
          <InputErrorText text="Número inválido." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[3] = element)}
              input={value}
              placeholder="Nome do Responsável"
              keyboardType="default"
              onSubmitEditing={() => nextField(4)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
            />
          )}
          name="responsavel"
        />
        {errors.responsavel?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[4] = element)}
              input={value}
              placeholder="Logradouro"
              keyboardType="default"
              onSubmitEditing={() => nextField(5)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
            />
          )}
          name="logradouro"
        />
        {errors.logradouro?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[5] = element)}
              input={value}
              placeholder="Bairro"
              keyboardType="default"
              onSubmitEditing={() => nextField(5)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
            />
          )}
          name="bairro"
        />
        {errors.bairro?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[5] = element)}
              input={value}
              placeholder="Número"
              keyboardType="default"
              onSubmitEditing={() => nextField(6)}
              setInput={text => onChange(text)}
              onBlur={onBlur}
            />
          )}
          name="numero"
        />
        {errors.numero?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              ref={element => (inputRefs.current[6] = element)}
              input={value}
              placeholder="CEP"
              keyboardType="default"
              setInput={text => onChange(text)}
              onBlur={onBlur}
            />
          )}
          name="cep"
        />
        {errors.cep?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <OpenImageLibrary launchImage={addImage} image={selectedImage} />

        <BottonRow>
          <BasicButton
            text="Cadastrar"
            onPress={handleSubmit(onSubmit)}
            marginTop={8}
          />
          <CancelButton onCancel={onCancel} />
        </BottonRow>
      </Container>
    </>
  );
};

const testValues: IRegisterCompayForm = {
  cnpj: '10.097.518/0001-49',
  nome_fantasia: 'Nome Fantasia',
  nome_razao: 'Nome Razao',
  email: 'bravo825@icmartiriliberta.it',
  telefone: '(85) 3155-4035',
  responsavel: 'Kyron Frank',
  bairro: 'Bela Vista',
  logradouro: 'Ceará',
  numero: '3880',
  cep: '77015-461',
  tipo: 'E',
};

export { RegisterCompany, OpenImageLibrary };
