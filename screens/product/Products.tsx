import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Results } from 'realm';

import { Color, Spacing } from '../../styles';
import { Header, Filter, InputWithIconAndClear, BasicButton, NoResultFound } from '../../components';
import { componentStyles, Container, filterChipsMock, FilterText, ModalWrapper, ProductsListHeader, ProductsListRow, Separator } from './Components';
import { RootStackParamList } from '../../App';
import { Company, User, RealmContext, Product, Brand, Category } from '../../frameworks/realm/context';
import { useDebounce } from '../../utils/hooks';
const { useQuery } = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'Produtos'>;
export function Products({ navigation }: Props) {
  const goBack = () => navigation.goBack();
  const infoModal = () => undefined;

  const [input, setInput] = React.useState('');
  const clearFn = () => setInput('');

  const [index, setIndex] = React.useState(0);
  const updateIndex = (filterIndex: number) => setIndex(filterIndex);

  const goToDetails = (item: Product) =>
    navigation.navigate('InformacoesProduto', { product_id: item.id });

  const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
  const company: Company | undefined = useQuery(Company).find((elem: Company) => elem.id === user!.current_company_id);

  const [searchTerms, setSearchTerms] = React.useState('nome CONTAINS [c] ""');
  const [filter, setFilter] = React.useState('nome CONTAINS[c] ""');
  const product: Results<Product> | undefined = useQuery(Product).filtered('empresa_id == $0', company?.id).filtered(`${searchTerms}`).filtered(filter);
  const brand: Results<Brand> | undefined = useQuery(Brand).filtered('empresa_id == $0', company?.id);
  const category: Results<Category> | undefined = useQuery(Category).filtered('empresa_id == $0', company?.id);

  const debouncedValue = useDebounce(input, 1000);

  React.useEffect(() => {
    const result = productNameQuery(...removeWhiteSpaces(debouncedValue).split(" "));
    setSearchTerms(result);
  }, [debouncedValue]);

  const [visible, setVisible] = React.useState(false);
  const renderItem = useCallback(({ item }: { item: Product; }) => (
    <ProductsListRow
      product={item}
      goToDetails={() => goToDetails(item)}
    />
  ), []);
  return (
    <Container>
      <Header
        text="Produtos"
        infoIcon={true}
        leftIconFn={goBack}
        infoIconFn={infoModal}
      />
      <InputWithIconAndClear
        input={input}
        setInput={text => setInput(text)}
        placeholder="Buscar"
        leftIcon={true}
        clearIcon={input.length > 0 ? true : false}
        clearFn={clearFn}
        marginHorizontal={Spacing[16]}
        marginTop={Spacing[16]}
      />
      <Filter
        chipsData={filterChipsMock}
        index={index}
        setIndex={updateIndex}
        onPress={(id) => {
          if (id === 0) {
            setFilter('nome CONTAINS [c] ""');
            return;
          }
          setVisible(true);
        }}
        arrowDown={true}
      />
      <ProductsListHeader length={product.length} onPress={() => {
        setFilter('nome CONTAINS [c] ""');
        setIndex(0);
      }} />
      <FlatList
        data={product.slice(0, 50)}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoResultFound />}
        ItemSeparatorComponent={() => <Separator />}
      />
      <ModalWrapper
        isVisible={visible}
        setVisible={() => setVisible(false)}
        title={filterChipsMock[index].text}
        subtitle={filterChipsMock[index].subtitle} >
        <FlatList
          data={filterItems(brand, category)[filterChipsMock[index].subtitle]}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilterText text={item.nome} onPress={() => {
            setVisible(false);
            const queryString = `${filterChipsMock[index].subtitle}_id == ${item.id}`;
            setFilter(queryString);
          }} />}
          style={componentStyles.filterContainer} />
        <BasicButton
          text='Fechar'
          colorText={Color.primary.riptide}
          colorButton={Color.primary.royalBlue}
          marginHorizontal={0}
          marginTop={16}
          marginBottom={28}
          onPress={() => setVisible(false)} />
      </ModalWrapper>
    </Container>
  );
}

export const productNameQuery = (...name: Array<string>) => name.map(nome => 'nome CONTAINS[c] ' + '\"' + nome + '\"').join(" AND ");
export const removeWhiteSpaces = (input: string) => input.trim().replace(/\s{2,}/g, ' ');

const filterItems = (...arg: Array<Results<Brand>>) => ({
  all: [] as const,
  marca: arg[0],
  categoria: arg[1],
});
