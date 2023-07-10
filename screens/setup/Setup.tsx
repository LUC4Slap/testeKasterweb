import React from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { Header, ButtonChip } from '../../components';
import { Color, Spacing } from '../../styles';
import { Container, SectionHeader, SectionSubTitle, SectionTitle, SwitchContainer, SwitchRowContainer } from './Components';
import { User, RealmContext, Company, Access } from '../../frameworks/realm/context';
const { useQuery } = RealmContext;

interface SwitchesType {
  [key: number]: boolean;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Configuracoes'>;
export function Setup({ navigation }: Props) {
  const user: User | undefined = useQuery(User).find((elem: User) => elem.isLogged = true);
  const access: Access | undefined = useQuery(Access).find((elem: Access) => elem.user_id === user!.id && elem.empresa_id === user!.current_company_id);

  const goBack = () => navigation.goBack();

  const [switches, setSwitch] = React.useState<SwitchesType>({
    '1': false,
    '2': true,
    '3': true,
  });
  const toggleSwitch = (numberOfSwitch: number) =>
    setSwitch({ ...switches, [numberOfSwitch]: !switches[numberOfSwitch] });

  return (
    <Container>
      <Header
        text="Configurações"
        leftIconFn={goBack}
        marginBottom={Spacing[12]}
      />
      <ScrollView>
        <SectionHeader title="Conta" marginTop={Spacing[32]} />
        <SectionTitle title={`${user?.name || 'Default'}`} marginTop={12} />
        <SectionSubTitle subtitle={user?.email ? user.email : 'default'} marginTop={6} />

        <SectionTitle title="Código de vendedor" marginTop={16} />
        <SectionSubTitle subtitle={(access?.cod_sistema ? access.cod_sistema.toString() : '')} marginTop={6} />
        <ButtonChip
          text="Alterar vendedor"
          textColor={Color.neutral.white}
          backgroundColor={Color.primary.royalBlue}
          alignSelf="flex-start"
          marginTop={16}
          marginLeft={16}
        />

        <SectionHeader title="Sincronização" marginTop={Spacing[40]} />
        <SwitchRowContainer
          leftSection={
            <>
              <SectionTitle
                title="Sincronização completa ao iniciar"
                marginTop={12}
              />
              <SectionSubTitle
                subtitle="Realizar a sincronização automaticamente"
                marginTop={3}
              />
            </>
          }
          SwitchSide={
            <SwitchContainer
              value={switches[1]}
              onValueChange={() => toggleSwitch(1)}
            />
          }
        />

        <SwitchRowContainer
          leftSection={
            <>
              <SectionTitle
                title="Enviar pedidos automaticamente"
                marginTop={12}
              />
              <SectionSubTitle
                subtitle="Sempre enviar os pedidos ao iniciar o aplicativo"
                marginTop={3}
              />
            </>
          }
          SwitchSide={
            <SwitchContainer
              value={switches[2]}
              onValueChange={() => toggleSwitch(2)}
            />
          }
        />

        <SwitchRowContainer
          leftSection={
            <>
              <SectionTitle
                title="Receber dados automaticamente"
                marginTop={12}
              />
              <SectionSubTitle
                subtitle="Sempre receber os dados ao iniciar o aplicativo"
                marginTop={3}
              />
            </>
          }
          SwitchSide={
            <SwitchContainer
              value={switches[3]}
              onValueChange={() => toggleSwitch(3)}
            />
          }
        />

        <SectionTitle title="Última atualização bem-sucedida" marginTop={12} />
        <SectionSubTitle subtitle="22/08/2020 às 16:30h" marginTop={3} />

        <SectionTitle title="Deletar dados" marginTop={12} color={Color.semantic.froly} />
        <SectionSubTitle
          subtitle="Apagar todos os dados de sincronização"
          marginTop={3}
        />

        <SectionHeader title="Feedback" marginTop={Spacing[40]} />
        <SectionTitle title="Relatório de erros" marginTop={12} />
        <SectionSubTitle
          subtitle="Enviar relatório de erros para a equipe"
          marginTop={3}
        />

        <SectionHeader title="Sobre" marginTop={Spacing[40]} />
        <SectionTitle title="Versão" marginTop={12} />
        <SectionSubTitle subtitle="V2.0.8" marginTop={3} />

        <SectionTitle title="Desenvolvido por Kasterweb" marginTop={12} />
        <SectionSubTitle subtitle="https://kasterweb.com.br" marginTop={3} />

        <SectionTitle title="Termos de Uso" marginTop={12} />
        <SectionTitle title="Política de Privacidade" marginTop={12} />

        <SectionHeader
          title="Zerar todos os dados do aplicativo"
          textAlign="center"
          color={Color.semantic.froly}
          marginTop={Spacing[40]}
          marginBottom={Spacing[40]}
        />
      </ScrollView>
    </Container>
  );
}
