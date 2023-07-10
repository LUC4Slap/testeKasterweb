import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { UpdateMode } from 'realm';

import { Access, Company, IAccess, ICompany, IUser, RealmContext, User } from '../../frameworks/realm/context';
const { useRealm } = RealmContext;
import { ICredentials, loginUser } from '../../frameworks/web/axios/Login.routes';

import {
  InputErrorText,
  BasicInput,
  BasicButton,
  InputPassword,
  LoadingModal,
} from '../../components';
import { Color, Spacing, Subtitle } from '../../styles';
import { Container, FieldTitle, ForgotPasswordBottomSheet, RegisterUser } from './Components';
import { defaultImage } from '../../utils/defaultImageLogin';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ICredentials>(
    {
      defaultValues: defaultUser,
    });

  const inputRefs = React.useRef<any>([]);
  const nextField = (fieldRef: number) => inputRefs.current[fieldRef].focus();

  const [loading, setLoading] = useState(false);
  const onSubmit = (data: ICredentials) => {
    setLoading(true);

    loginUser(data)
      .then((res) => {
        const user = res.data.user;
        persistAccesses(user.acessos);
        persistUser({ ...user, isLogged: true });
        persistCompanies(user.empresas);

        goToCNPJ(user.id);
      })
      .catch(err => {
        Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.');
      })
      .finally(() => {
        reset();
        setLoading(false);
      });
  };

  const db = useRealm();
  const persistUser = (user: IUser) =>
    db.write(() => {
      db.create('User', User.generate(user), UpdateMode.Modified);
    });

  const persistCompanies = (companies: Array<ICompany>) =>
    db.write(() => {
      for (const company of companies) {
        db.create('Company', Company.generate(company), UpdateMode.Modified);
      }
    });
  const persistAccesses = (accesses: Array<IAccess>) =>
    db.write(() => {
      for (const access of accesses) {
        db.create('Access', Access.generate(access), UpdateMode.Modified);
      }
    });


  const goToCNPJ = (user_id: number) =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'CNPJ', params: { user_id } }],
      }));

  const [isVisible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(!isVisible);

  return (
    <>
      <LoadingModal state={loading} />
      <Container>
        <View style={styles.imageContainerLogo}>
          <Image
            source={require('../../assets/kv-logo-small.png')}
            style={styles.imageLogo}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `data:image/png;base64,${defaultImage}`,
            }}
            style={styles.image}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>

        <FieldTitle text="Preencha os seus dados" />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BasicInput
              input={value}
              placeholder="Seu E-mail"
              keyboardType="email-address"
              setInput={text => onChange(text)}
              autoCapitalize="none"
              onSubmitEditing={() => nextField(0)}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email?.type === 'required' && (
          <InputErrorText text="Campo obrigatório." />
        )}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputPassword
              ref={element => (inputRefs.current[0] = element)}
              input={value}
              placeholder="Sua Senha"
              autoCapitalize="none"
              keyboardType="default"
              onSubmitEditing={handleSubmit(onSubmit)}
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

        <View style={styles.buttonsRow}>
          <BasicButton
            text="Login"
            onPress={handleSubmit(onSubmit)}
            marginTop={8}
          />
          <Text
            onPress={changeVisibility}
            style={[Subtitle[2], styles.forgotPassword]}>
            Esqueceu{'\n'}sua senha?
          </Text>
        </View>
        <RegisterUser
          onPress={() => navigation.navigate('CadastrarUsuario')}
          firstSentence="Não tem cadastro?"
          secondSentence="Criar uma conta"
        />
      </Container>
      <ForgotPasswordBottomSheet
        isVisible={isVisible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};


const dimension = Dimensions.get('screen');

interface Login {
  user: {
    email: string;
    password: string;
    aparelho_serie: string;
    cnpj: string;
  };
}

// const defaultUser = { email: 'wisexaj291@covbase.com', password: '123456' };
const defaultUser = { email: 'gerente@kasterweb.com.br', password: 'kwb03@tec' };

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    backgroundColor: Color.neutral.white,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 200 / 2,
  },
  imageContainerLogo: {
    width: 70,
    height: 70,
    backgroundColor: Color.neutral.white,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 70 / 2,
    marginTop: `${dimension.height * 0.0114}%`,
  },
  imageLogo: { alignSelf: 'center', width: 36, height: 36 },
  image: { alignSelf: 'center', width: 120, height: 120 },
  flexOne: { flex: 1 },
  buttonsRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: Spacing[8],
  },
  forgotPassword: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: Spacing[8],
    color: Color.neutral.white,
    paddingHorizontal: Spacing[16],
  },
});

export { Login };
