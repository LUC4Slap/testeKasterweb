
import React from 'react';
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';

import { RootStackParamList } from '../../App';
import { Icon } from '../../components';
import { Color } from '../../styles';
import { Customer } from './Customer';
import { Corporate } from './Corporate';
import { HeaderArrow } from './Components';

const Tab = createBottomTabNavigator<RootTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'NovoCliente'>;
export const NewClientTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Pessoa Física'
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
            <Tab.Screen name='Pessoa Física' component={Customer} />
            <Tab.Screen name='Pessoa Jurídica' component={Corporate} />
        </Tab.Navigator>
    );
};

export type RootTabParamList = {
    "Pessoa Física": undefined,
    "Pessoa Jurídica": undefined;
};

function pickName(routeName: keyof RootTabParamList) {
    if (routeName === 'Pessoa Física') {
        return 'group';
    } else if (routeName === 'Pessoa Jurídica') {
        return 'business';
    } else {
        return 'group';
    }
}

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