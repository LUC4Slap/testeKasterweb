import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { ButtonChip } from '../../components';
import { ButtonWithIcon, Container, Header, HeaderImage, ImportantInformations, SubHeader, SubtitleHeader } from './Components';
import { Color, Spacing } from '../../styles';
import { CNPJMask } from '../../utils/helpers';
import { Access, Company, RealmContext, User } from '../../frameworks/realm/context';
import { kvLogoSmallBlob } from '../../assets/kv-logo-small-blob';
import { RootStackParamList } from '../../App';
const { useQuery, useRealm } = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export function Home({ navigation }: Props) {
  const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
  const company: Company | undefined = useQuery(Company).find((elem: Company) => elem.id === user!.current_company_id);
  const access: Access | undefined = useQuery(Access).find((elem: Access) => elem.user_id === user!.id && elem.empresa_id === user!.current_company_id);

  const db = useRealm();
  const realmLogOut = () => db.write(() => {
    const tables = ['User', 'Company', 'Sync', 'Access', 'Product', 'Brand', 'Category'];
    for (const table of tables) {
      db.delete(db.objects(table));
    }
  });

  return (
    <Container>
      <ImportantInformations
        left={<HeaderImage blob={company?.logo_blob || kvLogoSmallBlob} />}
        right={
          <>
            <Header text={(access?.cod_sistema ? access.cod_sistema + ' - ' : '') + (user?.name || 'undefined')} />
            <SubtitleHeader text={company?.nome_razao || 'undefined'} />
            <SubHeader text={CNPJMask(company?.cnpj || '00.000.000/0001-00')} />
          </>
        }
      />

      <ButtonChip
        text="Alterar Empresa"
        textColor={Color.primary.royalBlue}
        onPress={() => navigation.navigate('AlterarEmpresa')}
        marginTop={Spacing[16]}
        textAlign="center"
      />

      <ButtonWithIcon
        text="Resumo"
        navigationFunction={() => navigation.navigate('Resumo')}
        icon="growth-graphic"
        marginTop={Spacing[24]}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Pedidos"
        navigationFunction={() => navigation.navigate('Pedidos')}
        icon="orders"
        marginTop={40}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Clientes"
        navigationFunction={() => navigation.navigate('Clientes')}
        icon="group"
        marginTop={40}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Produtos"
        navigationFunction={() => navigation.navigate('Produtos')}
        icon="products"
        marginTop={40}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Sincronização"
        icon="sync"
        subtitle={true}
        subtitleText="Atualizado: 22/08 às 16:30h"
        navigationFunction={() => navigation.navigate('Sincronizar', { user_id: user!.id })}
        marginTop={40}
      />
      <ButtonWithIcon
        text="Configurações"
        navigationFunction={() => navigation.navigate('Configuracoes')}
        icon="setup"
        marginTop={40}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Ajuda e Suporte"
        navigationFunction={() => navigation.navigate('AjudaESuporte')}
        icon="contact"
        marginTop={40}
        arrowIcon={true}
      />
      <ButtonWithIcon
        text="Sair"
        navigationFunction={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
          realmLogOut();
        }}
        icon="log-out"
        marginTop={40}
        marginBottom={40}
      />
    </Container>
  );
}

