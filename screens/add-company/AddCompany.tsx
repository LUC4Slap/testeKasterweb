import React, { useState } from "react";
import { UpdateMode } from "realm";
import DeviceInfo from 'react-native-device-info';
import { Alert, FlatList } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BasicButton, InputWithIconAndClear, LoadingModal } from "../../components";
import { Access, Company, IAccess, ICompany, RealmContext, User } from "../../frameworks/realm/context";
const { useRealm, useQuery } = RealmContext;
import { addUserToCompany, IAddCompany, listCompanies } from "../../frameworks/web/axios/AddCompany.routes";
import { IAparelho, IColaborador } from "../../frameworks/web/axios/RegisterUser.routes";
import { Color, Spacing } from "../../styles";
import { Container, FillBlank, Header, ListRow, ModalContainer, Separator } from "./Components";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, 'AdicionarEmpresa'>;

type ICompanies = Array<{ id: number, nome_razao: string, cnpj: string; }> | [];

export const AddCompany = ({ navigation, route }: Props) => {
    const [companies, setCompanies] = React.useState<ICompanies>([]);

    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);

        listCompanies()
            .then(res => setCompanies(res.data.data))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
            .finally(() => setLoading(false));
    }, []);

    const [modal, setModal] = useState(false);
    const { user_id } = route.params;
    const [item, setItem] = useState({ user_id, empresa_id: -1, cnpj: '1' });
    const getCodSistema = ({ empresa_id, cnpj }: { empresa_id: number, cnpj: string; }) => {
        setModal(true);
        setItem({ ...item, empresa_id, cnpj });
    };
    const callback = (cod_sistema: number) => {
        setModal(false);
        const dataToLink: IInput = { ...item, cod_sistema };
        linkCompanyToUser(dataToLink, item.cnpj);
    };

    const user: User = useQuery(User).find((elem: User) => elem.id === user_id);
    const linkCompanyToUser = (dataToLink: IInput, cnpj: string) => {
        setLoading(true);

        addUserToCompany(jsonToSend(dataToLink), cnpj)
            .then(res => {
                const apiUser = res.data.user;
                persistAccesses(apiUser.acessos);
                persistCompanies(apiUser.empresas);
                setCurrentCompanyId(user, dataToLink.empresa_id);

                goToHome();
            })
            .catch(err => {
                Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.');
                navigation.goBack();
            })
            .finally(() => {
                setLoading(false);
                setCompanies([]);
            });
    };

    const db = useRealm();
    const persistCompanies = (companies: Array<ICompany>) =>
        db.write(() => {
            for (const company of companies) {
                db.create('Company', Company.generate(company), UpdateMode.Modified);
            }
        });
    const setCurrentCompanyId = (user: User, id: number) =>
        db.write(() => {
            user.current_company_id = id;
        });
    const persistAccesses = (accesses: Array<IAccess>) =>
        db.write(() => {
            for (const access of accesses) {
                db.create('Access', Access.generate(access), UpdateMode.Modified);
            }
        });

    const goToHome = () =>
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            }));

    return (
        <>
            <LoadingModal state={loading} />
            <CodSisModal visible={modal} callback={callback} onPress={() => setModal(false)} />
            <Container>
                <Header
                    text="Adicionar Empresa"
                    infoIcon={false}
                    infoIconFn={() => undefined}
                    marginBottom={Spacing[24]}
                />
                {companies.length === 0 && <FillBlank />}
                {companies.length > 0 &&
                    <FlatList
                        data={companies}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <ListRow
                                index={item.id.toString()}
                                currentIndex={'0'}
                                onPress={() => getCodSistema({ empresa_id: item.id, cnpj: item.cnpj })}
                                companyName={item.nome_razao}
                                companyCNPJ={item.cnpj}
                            />
                        }
                        ItemSeparatorComponent={Separator}
                        style={{ paddingHorizontal: Spacing[16] }} />}
                <BasicButton
                    text="Cancelar"
                    colorText={Color.neutral.white}
                    colorButton={Color.semantic.froly}
                    marginHorizontal={Spacing[16]}
                    marginTop={Spacing[24]}
                    marginBottom={Spacing[14]}
                    onPress={() => navigation.goBack()}
                />
            </Container>
        </>
    );
};

const CodSisModal = ({ visible, callback, onPress }: { visible: boolean, callback: (cod_sistema: number) => void; onPress: () => void; }) => {
    const [input, setInput] = useState('');
    const clearFn = () => setInput('');

    return (
        <ModalContainer visible={visible} onPress={onPress}>
            <InputWithIconAndClear
                input={input}
                leftIcon={false}
                clearFn={clearFn}
                placeholder="código"
                keyboardType='number-pad'
                marginHorizontal={Spacing[16]}
                setInput={text => setInput(text)}
                clearIcon={input.length > 0 ? true : false}
                onSubmitEditing={() => {
                    callback(parseInt(input));
                    clearFn();
                }}
            />
            <BasicButton
                text="Adicionar"
                colorText={Color.primary.riptide}
                colorButton={Color.primary.royalBlue}
                marginHorizontal={Spacing[16]}
                marginTop={Spacing[12]}
                marginBottom={Spacing[2]}
                onPress={() => {
                    callback(parseInt(input));
                    clearFn();
                }}
            />
        </ModalContainer>
    );
};

const defaultPermissions = (cod_sistema: number): IColaborador => ({
    cod_sistema,
    editar_preco: 0,
    sync_cliente: 0,
    multi_acesso: 0,
    criar_cliente: 0,
    reset_kvendas: 0,
    cargo_id: 1
});

const defaultDevice = (): IAparelho => ({
    numero_serie: DeviceInfo.getUniqueId(),
    marca: DeviceInfo.getBrand(),
    modelo: DeviceInfo.getModel(),
    authorization_key: null,
    date_authorization_key: null,
});

type IInput = { user_id: number, empresa_id: number, cod_sistema: number; };
const jsonToSend = (input: IInput): IAddCompany => ({
    user_id: input.user_id,
    empresa_id: input.empresa_id,
    colaborador: defaultPermissions(input.cod_sistema),
    aparelho: defaultDevice()
});
