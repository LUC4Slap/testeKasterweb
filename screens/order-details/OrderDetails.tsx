import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { Color, Spacing } from '../../styles';
import { Column, Container, HeaderArrow, ItemsList, SectionHeader, SectionSubTitle, SectionTitle, Totals } from "./Components";

type Props = NativeStackScreenProps<RootStackParamList, 'PedidoDetalhes'>;
export const OrderDetails = ({ navigation }: Props) => {
    const goBack = () => navigation.goBack();
    return (
        <Container>
            <HeaderArrow
                text="Detalhes"
                colorText={Color.neutral.black}
                colorIcon={Color.primary.royalBlue}
                helperText='Editar Pedido'
                onPressEdit={() => undefined}
                onPress={goBack}
            />
            <SectionHeader
                title='Informações'
                marginTop={Spacing[32]}
                marginBottom={Spacing[20]}
            />
            <View style={{ flexDirection: 'row' }}>
                <Column flex={1}>
                    <SectionTitle title='Código' />
                    <SectionSubTitle subtitle={'55'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='Cliente' />
                    <SectionSubTitle subtitle={'Alvus Dumbledore'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={1}>
                    <SectionTitle title='Tipo' />
                    <SectionSubTitle subtitle={'Orçamento'} marginTop={Spacing[2]} />
                </Column>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: Spacing[12] }}>
                <Column flex={1}>
                    <SectionTitle title='Código' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={'42'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={2}>
                    <SectionTitle title='Cliente' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={'Draco Malfoy'} marginTop={Spacing[2]} />
                </Column>
                <Column flex={1}>
                    <SectionTitle title='Data' marginTop={Spacing[16]} />
                    <SectionSubTitle subtitle={'03 FEV 2025'} marginTop={Spacing[2]} />
                </Column>
            </View>
            <ItemsList />
            <Totals />
        </Container>
    );
};
