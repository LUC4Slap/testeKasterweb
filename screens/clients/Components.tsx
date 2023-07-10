import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Body, Button, Color, Spacing, Subtitle } from '../../styles';
import { Icon } from '../../components';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

export const filterChipsMock = [
    { id: 0, text: 'Todos' },
    { id: 1, text: 'MT' },
    { id: 2, text: 'RJ' },
    { id: 3, text: 'SP' },
    { id: 4, text: 'SC' },
    { id: 5, text: 'AC' },
    { id: 6, text: 'AL' },
    { id: 7, text: 'AP' },
    { id: 8, text: 'AM' },
    { id: 9, text: 'BA' },
    { id: 10, text: 'CE' },
    { id: 11, text: 'ES' },
    { id: 12, text: 'GO' },
    { id: 13, text: 'MA' },
    { id: 14, text: 'MG' },
];

export const ClientsListHeader = ({ length, onPress }: { length: number; onPress: () => void; }) => (
    <View style={styles.clientsListCleanFilterContainer}>
        <Text style={[Body.small, styles.clientsListCleanFilterContainerHeader1]} onPress={onPress}>
            Limpar filtros
        </Text>
        <Text style={[Body.small, { color: Color.neutral.boulder }]}>
            {length} resultado(s)
        </Text>
    </View>
);

export const ClientsListSectionHeader = ({ title }: { title: string; }) => (
    <Text style={[Button.default, styles.clientsListSectionHeader]}>{title}</Text>
);

const ClientsListRowHeader = ({ name }: { name: string; }) => (
    <Text numberOfLines={1} style={[Subtitle[1], styles.clientListRowButtonHeaderText]}>
        {name}
    </Text>
);

const ClientsListRowSubtitle = () => (
    <View style={styles.clientListRowSubtitleContainer}>
        <Text style={[Subtitle[3], styles.clientListSubtitle1]}>Cidade</Text>
        <Text style={[Subtitle[3], styles.clientListSubtitle1]}>Contato</Text>
        <Text style={[Subtitle[3], styles.clientListSubtitle1]}>CPF/CNPJ</Text>
    </View>
);

interface RowValues {
    city: string;
    phoneNumber: string;
    socialNumber: string;
}
const ClientsListRowValues = ({ city, phoneNumber, socialNumber }: RowValues) => (
    <View style={styles.clientListRowValuesContainer}>
        <Text style={[Body.small, styles.clientListRowValue1]} numberOfLines={1}>{city}</Text>
        <Text style={[Body.small, styles.clientListRowValue1]}>{phoneNumber}</Text>
        <Text style={[Body.small, styles.clientListRowValue1]}>{socialNumber}</Text>
    </View>
);

interface Row {
    cpf_cnpj: string;
    nome_completo: string;
    telefone: string;
    cidade?: string;
    estado?: string;
    onPress: () => void;
}
export const ClientListRow = ({ cpf_cnpj, nome_completo, telefone, cidade, estado, onPress }: Row) => (
    <TouchableOpacity style={styles.clientListRowButton} onPress={onPress}>
        <View style={styles.flexOne}>
            <ClientsListRowHeader name={nome_completo} />
            <ClientsListRowSubtitle />
            <ClientsListRowValues
                city={`${cidade || ''} - ${estado || ''}`}
                phoneNumber={telefone}
                socialNumber={cpf_cnpj}
            />
        </View>
        <Icon
            name="arrow"
            size={18}
            color={Color.neutral.black}
            style={styles.clientListRowIcon}
        />
    </TouchableOpacity>
);
export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    clientsListCleanFilterContainer: {
        flexDirection: 'row',
        marginHorizontal: Spacing[24],
        marginTop: Spacing[16],
    },
    clientsListCleanFilterContainerHeader1: {
        color: Color.primary.royalBlue,
        flex: 1,
    },
    clientsListSectionHeader: {
        flex: 1,
        backgroundColor: Color.neutral.mercury,
        color: Color.neutral.boulder,
        minHeight: 36,
        maxHeight: 36,
        textAlign: 'left',
        textAlignVertical: 'center',
        borderRadius: 10,
        marginHorizontal: Spacing[24],
        marginBottom: Spacing[20],
        marginTop: Spacing[20],
        paddingLeft: Spacing[16],
    },
    clientListRowButtonHeaderText: { color: Color.neutral.black },
    clientListRowSubtitleContainer: {
        flexDirection: 'row',
        marginTop: Spacing[14],
    },
    clientListSubtitle1: { color: Color.neutral.boulder, flex: 1 },
    clientListRowValuesContainer: { flexDirection: 'row', marginTop: Spacing[4] },
    clientListRowValue1: { color: Color.neutral.black, flex: 1 },
    clientListRowButton: { marginHorizontal: Spacing[24], flexDirection: 'row' },
    clientListRowIcon: { alignSelf: 'center', transform: [{ rotate: '180deg' }] },
    flexOne: { flex: 1 },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginHorizontal: Spacing[32],
        marginVertical: Spacing[20],
    },
});
