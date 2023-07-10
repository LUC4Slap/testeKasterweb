import React from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

import { Color } from '../../styles';
import { RootStackParamList } from "../../App";
import { Icon } from '../../components';
import { Details } from './Details';
import { HeaderArrow } from '../novo-cliente/Components';

const Tab = createBottomTabNavigator<RootTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'InformacoesCliente'>;
export const ClientTabs = ({ route }: Props) => {
    const { client_id } = route.params;

    return (
        <Tab.Navigator
            initialRouteName="Detalhes"
            screenOptions={({ route }) => ({
                headerShown: true,
                header: (props) => <CustomHeader {...props} />,
                tabBarStyle: { minHeight: 72 },
                tabBarItemStyle: { paddingVertical: 12 },
                tabBarIcon: ({ color, size }) => {
                    const name = pickName(route.name);
                    return <Icon name={name} color={color} size={size} />;
                },
                tabBarActiveTintColor: Color.primary.royalBlue,
                tabBarInactiveTintColor: Color.neutral.boulder
            })}>
            <Tab.Screen name='Detalhes' component={Details} initialParams={{ client_id }} />
            <Tab.Screen name='Financeiro' component={Ledger} />
            <Tab.Screen name='Historico' component={History} />
        </Tab.Navigator >
    );
};

const Ledger = () => {
    return (<></>);
};

const History = () => {
    return (<></>);
};

function pickName(routeName: keyof RootTabParamList) {
    if (routeName === 'Detalhes') {
        return 'magnifying-glass';
    } else if (routeName === 'Financeiro') {
        return 'wallet';
    } else {
        return 'clock';
    }
}
export type RootTabParamList = {
    Detalhes: { client_id: number; },
    Financeiro: undefined,
    Historico: undefined;
};

const CustomHeader = ({ options, route, navigation }: BottomTabHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <HeaderArrow
            text={title}
            colorText={Color.neutral.black}
            colorIcon={Color.primary.royalBlue}
            onPress={() => navigation.navigate('Clientes')} />
    );
};