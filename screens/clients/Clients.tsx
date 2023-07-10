import React from 'react';
import { SectionList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import _ from 'lodash';

import { RootStackParamList } from '../../App';
import { Color, Spacing } from '../../styles';
import { Header, Filter, BasicButton, InputWithIconAndClear, NoResultFound } from '../../components';
import {
  ClientListRow,
  ClientsListHeader,
  ClientsListSectionHeader,
  Container,
  filterChipsMock,
  Separator,
} from './Components';
import { useDebounce } from '../../utils/hooks';
import { removeWhiteSpaces } from '../product/Products';
import { User, RealmContext, Client, Address } from '../../frameworks/realm/context';
const { useQuery } = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'Clientes'>;
export function Clients({ navigation }: Props) {
  const [input, setInput] = React.useState('');
  const clearFn = () => setInput('');

  const debouncedValue = useDebounce(input, 1000);
  const [searchTerms, setSearchTerms] = React.useState('nome_completo CONTAINS[c] ""');
  React.useEffect(() => {
    const result = clientNameQuery(...removeWhiteSpaces(debouncedValue).split(" "));
    setSearchTerms(result);
  }, [debouncedValue]);

  const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);

  const [filter, setFilter] = React.useState('estado CONTAINS [c] ""');
  const address: Array<Address> | undefined = useQuery(Address)
    .filtered(`empresa_id = $0`, user?.current_company_id)
    .filtered(filter)
    .slice(0, 6);
  const client_ids = address?.map(elem => elem.cliente_id);

  const client: Array<Client> | undefined = useQuery(Client)
    .sorted('nome_completo')
    .filtered(`empresa_id == $0`, user?.current_company_id)
    .filtered(`${searchTerms} AND id IN {${client_ids}}`)
    .slice(0, 6);

  const [index, setIndex] = React.useState(0);
  const updateIndex = (filterIndex: number) => setIndex(filterIndex);

  const result: Object = _.groupBy(client, (elem: Client) => elem.nome_completo.charAt(0));
  const reshaped = reshapeToSectionList(result);

  const goBack = () => navigation.goBack();
  const goToInfoClient = (item: Client) => navigation.navigate('InformacoesCliente', { client_id: item.id });
  return (
    <Container>
      <Header text="Clientes" leftIconFn={goBack} />
      <InputWithIconAndClear
        input={input}
        setInput={text => setInput(text)}
        placeholder="Buscar por nome"
        leftIcon={true}
        clearIcon={input.length > 0 ? true : false}
        clearFn={clearFn}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[16]}
      />
      <Filter
        chipsData={filterChipsMock}
        index={index}
        setIndex={updateIndex} onPress={(id) => {
          if (id === 0) {
            setFilter('estado CONTAINS [c] ""');
            return;
          } else {
            setFilter(`estado == "${filterChipsMock[id].text}"`);
          }
        }} />
      <ClientsListHeader length={client.length > 50 ? 50 : client?.length} onPress={() => {
        setFilter('estado CONTAINS[c] ""');
        setIndex(0);
      }} />
      <SectionList
        sections={reshaped}
        extraData={reshaped}
        ListEmptyComponent={<NoResultFound />}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) =>
          <ClientListRow
            cpf_cnpj={item.cpf_cnpj}
            nome_completo={item.nome_completo}
            telefone={item.telefone}
            cidade={address[index]?.cidade}
            estado={address[index]?.estado}
            onPress={() => goToInfoClient(item)}
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <ClientsListSectionHeader title={title} />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <BasicButton
        text="Novo Cliente"
        colorText={Color.primary.riptide}
        colorButton={Color.primary.royalBlue}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[32]}
        marginBottom={Spacing[14]}
        onPress={() => navigation.navigate('NovoCliente')}
      />
    </Container>
  );
}

const clientNameQuery = (...name: Array<string>) => name.map(nome => 'nome_completo CONTAINS[c] ' + '\"' + nome + '\"').join(" AND ");

export const reshapeToSectionList = (groupedData: any) =>
  Object.keys(groupedData)
    .map((elem) => ({
      title: elem,
      data: groupedData[elem]
    }));
