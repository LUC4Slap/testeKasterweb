import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { Company, RealmContext, User } from '../../frameworks/realm/context';
const { useQuery, useRealm } = RealmContext;

import { Color, Spacing } from '../../styles';
import { Container, Header, ListRow, Separator } from './Components';
import { BasicButton } from '../../components';
import { RootStackParamList } from '../../App';

// const defaultCNPJ: string = '14453177000158';

type Props = NativeStackScreenProps<RootStackParamList, 'CNPJ'>;

export const CNPJ = ({ navigation, route }: Props) => {
  const { user_id } = route.params;
  const user = useRealm().objectForPrimaryKey<User>('User', user_id);
  const companies: Realm.Results<Company> = useQuery(Company).filtered(`id IN {${user!.companies_id}}`);

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }));
  };

  const db = useRealm();
  const setUserCompanyId = (id: number) => {
    db.write(() => {
      user!.current_company_id = id;
    });
  };

  const doLogout = () => {
    goToLogin();
    realmLogOut();
  };
  const realmLogOut = () => db.write(() => {
    const tables = ['User', 'Company', 'Sync', 'Access', 'Product', 'Brand', 'Category'];
    for (const table of tables) {
      db.delete(db.objects(table));
    }
  });

  const goToLogin = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }));

  const goToRegisterCompany = () => navigation.navigate('AdicionarEmpresa', { user_id });
  return (
    <Container>
      <Header
        text="Escolher Empresa"
        infoIcon={true}
        infoIconFn={doLogout}
        marginBottom={Spacing[24]}
      />
      <FlatList
        data={companies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <ListRow
            index={item.id.toString()}
            currentIndex={'0'}
            onPress={() => {
              setUserCompanyId(item.id);
              goToHome();
            }}
            companyName={item.nome_razao}
            companyCNPJ={item.cnpj}
          />
        }
        ItemSeparatorComponent={Separator}
        style={{ paddingHorizontal: Spacing[16] }} />
      <BasicButton
        text="Adicionar empresa"
        colorText={Color.primary.riptide}
        colorButton={Color.primary.royalBlue}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[32]}
        marginBottom={Spacing[14]}
        onPress={goToRegisterCompany}
      />
    </Container>
  );
};
