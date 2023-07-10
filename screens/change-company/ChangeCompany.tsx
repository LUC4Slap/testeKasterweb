import React from 'react';
import { View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { Header, BasicButton } from '../../components';
import { Color, Spacing } from '../../styles';
import { Container, ListRow, Separator } from './Components';
import { User, RealmContext, Company } from '../../frameworks/realm/context';
const { useQuery, useRealm } = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'AlterarEmpresa'>;
export function ChangeCompany({ navigation }: Props) {
  const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
  const companies: Realm.Results<Company> = useQuery(Company).filtered(`id IN {${user!.companies_id}}`);

  const db = useRealm();
  const setUserCompanyId = (id: number) => {
    db.write(() => {
      user!.current_company_id = id;
    });
  };

  const goBack = () => navigation.goBack();
  return (
    <Container>
      <Header
        text="Alterar empresa"
        leftIconFn={goBack}
        marginBottom={Spacing[24]}
      />
      <FlatList
        data={companies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListRow
            index={item.id.toString()}
            currentIndex={user?.current_company_id?.toString() || '0'}
            companyName={item.nome_razao}
            companyCNPJ={item.cnpj}
            onPress={() => {
              setUserCompanyId(item.id);
              navigation.goBack();
            }}
          />
        )}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: Spacing[16] }}
      />
      {companies.length === 0 && <View style={{ flex: 1 }} />}
      <BasicButton
        text="Adicionar empresa"
        colorText={Color.primary.riptide}
        colorButton={Color.primary.royalBlue}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[32]}
        marginBottom={Spacing[14]}
        onPress={() => navigation.replace('AdicionarEmpresa', { user_id: user?.id || -1 })}
      />
    </Container>
  );
}
