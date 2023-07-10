import React from "react";
import { View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Spacing } from "../../styles";
import { RootTabParamList } from "./ClientInfo";
import { Column, Container, SectionSubTitle, SectionTitle } from "./Components";
import { SectionHeader } from "../setup/Components";
import { Client, User, RealmContext, Address } from "../../frameworks/realm/context";
const { useQuery } = RealmContext;

type Props = BottomTabScreenProps<RootTabParamList, 'Detalhes'>;
export const Details = ({ route }: Props) => {
    const { client_id } = route.params;

    const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
    const client: Client | undefined = useQuery(Client).find((elem: Client) => elem.id === client_id && elem.empresa_id === user?.current_company_id);
    const address: Address | undefined = useQuery(Address).find((elem: Address) => elem.cliente_id === client_id && elem.empresa_id === user?.current_company_id);

    return (
        <Container>
            <SectionHeader title='Informações' marginTop={Spacing[32]} />
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Código do Cliente' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={client_id.toString()} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='CPF/CNPJ' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={client?.cpf_cnpj || '000.000.000-00'} marginTop={Spacing[2]} />
                </Column>
            </View>

            <SectionHeader title='Contato' marginTop={Spacing[24]} />
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Telefone 1' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={client?.telefone || '(00) 9 0000-0000'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='E-mail' marginTop={Spacing[20]} />
                    <SectionSubTitle subtitle={client?.email || 'default'} marginTop={Spacing[2]} />
                </Column>
            </View>

            <SectionHeader title='Endereço' marginTop={Spacing[24]} />
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Rua' marginTop={Spacing[20]} />
                    <SectionSubTitle subtitle={address?.logradouro || 'default'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='Número' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={address?.numero || 'default'} marginTop={Spacing[2]} />
                </Column>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Bairro' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={address?.bairro || 'default'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='Complemento' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={address?.complemento || 'default'} marginTop={Spacing[2]} />
                </Column>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Cidade' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={address?.cidade || 'default'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='Estado' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={address?.estado || 'default'} marginTop={Spacing[2]} />
                </Column>
            </View>
        </Container>
    );
};