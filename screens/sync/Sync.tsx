import React, { useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Results, UpdateMode } from 'realm';
import { doHTTPRequest, deleteFile } from '@kasterweb/http-stream-rn';
import { getJSONArray } from '@kasterweb/get-native-array';

import { Address, Brand, Category, Client, Company, IAddress, IBrand, ICategory, IClient, IProduct, IProductPrice, IUnit, Product, ProductPrice, RealmContext, Syncing, Unit, User } from '../../frameworks/realm/context';
const { useQuery, useRealm, useObject } = RealmContext;
import { Header, LoadingModal } from '../../components';
import { Spacing } from '../../styles';
import { Container, ListRow, Separator } from './Components';
import { baseURLStringTest } from '../../utils/api';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Sincronizar'>;
export function Sync({ navigation, route }: Props) {
    const { user_id } = route.params;
    const sync: Results<Syncing> = useQuery(Syncing).filtered('user_id == $0', user_id);
    const user: User | undefined = useObject(User, user_id);
    const currentCompany: Company | undefined = useObject(Company, user?.current_company_id || 0);

    React.useEffect(() => {
        if (sync.isEmpty() === true) {
            createHistoryFor();
        }
    }, []);

    const db = useRealm();
    const createHistoryFor = () => {
        db.write(() => {
            for (const name of tableNames) {
                db.create('Sync', Syncing.generate(mountHistory(name, user_id)));
            }
        });
    };

    const markSynced = (item: Syncing) =>
        db.write(() => {
            item.last_sync = brazilTimeZone(new Date());
        });

    const [loading, setLoading] = useState(false);
    const doSync = (item: Syncing) => {
        setLoading(true);
        requestData(item);
    };

    const requestData = (item: Syncing) => {
        doHTTPRequest({
            url: mountRequestURL(item),
            method: 'GET',
            fileName: item.name + '.json'
        })
            .then(() => {
                markSynced(item);
                persistTable(item.name, () => callback());
                const callback = () => deleteFile(item.name + '.json', (result) => console.debug('file deleted is: ', result));
            })
            .catch(err => Alert.alert('Aviso', err.toString()))
            .finally(() => setLoading(false));
    };

    const persistTable = (name: ITableNames, callback: () => void) =>
        getJSONArray(name + '.json')
            .then(table => {
                console.debug('persist table invoked');
                db.write(() => {
                    for (const row of table) {
                        db.create(getTableName(name), generateDBObject[getObjectName(name)](row), UpdateMode.Modified);
                    }
                });
            })
            .catch(error => Alert.alert('Aviso', `${error}`))
            .finally(() => callback());

    const mountRequestURL = (item: Syncing) => {
        return `${baseURLStringTest}/app/k-vendas/stream/${currentCompany?.cnpj || 0}/${item.name.toLowerCase()}?doubleQuotes=true`;
    };

    const goBack = () => navigation.goBack();

    return (
        <>
            <LoadingModal state={loading} />
            <Container>
                <Header text="Sincronizar" leftIconFn={goBack} />
                <FlatList
                    data={sync}
                    renderItem={({ item }) => <ListRow item={item} callback={(item) => doSync(item)} />}
                    ItemSeparatorComponent={Separator}
                    style={{ marginTop: Spacing[14], marginBottom: Spacing[16] }}
                />
            </Container>
        </>
    );
}

const brazilTimeZone = (date: Date) => {
    date.setHours(date.getHours() - 3);
    return date;
};

const mountHistory = (name: string, user_id: number) => ({
    id: undefined,
    name,
    user_id,
    last_sync: undefined
});

const generateDBObject = {
    produto: (data: IProduct) => Product.generate(data),
    categoria: (data: ICategory) => Category.generate(data),
    marca: (data: IBrand) => Brand.generate(data),
    cliente: (data: IClient) => Client.generate(data),
    endereco: (data: IAddress) => Address.generate(data),
    unidade: (data: IUnit) => Unit.generate(data),
    produtosPreco: (data: IProductPrice) => ProductPrice.generate(data)
};

const tableNames = ['Produtos', 'Categorias', 'Marcas', 'Clientes', 'Enderecos', 'Unidades', 'Precos'] as const;
export type ITableNames = typeof tableNames[number];

const getTableName = (name: ITableNames) => ETableNames[name];
enum ETableNames {
    Produtos = 'Product',
    Categorias = 'Category',
    Marcas = 'Brand',
    Clientes = 'Client',
    Enderecos = 'Address',
    Unidades = 'Unit',
    Precos = 'ProductPrice',
}

const getObjectName = (name: ITableNames) => EGenerateNames[name];
enum EGenerateNames {
    Produtos = 'produto',
    Categorias = 'categoria',
    Marcas = 'marca',
    Clientes = 'cliente',
    Enderecos = 'endereco',
    Unidades = 'unidade',
    Precos = 'produtosPreco',
}
