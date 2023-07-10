import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonChip, Icon } from '../../components';
import { Body, Color, Heading, Spacing, Subtitle } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

const OrderListRowSubtitle = () => (
    <View style={styles.orderListRowSubtitleContainer}>
        <Text style={[Subtitle[3], styles.orderListSubtitle1]}>Data de Venda</Text>
        <Text style={[Subtitle[3], styles.orderListSubtitle1]}>Tipo</Text>
        <Text style={[Subtitle[3], styles.orderListSubtitle2]}>Valor da venda</Text>
    </View>
);

const OrderListRowValues = ({
    date,
    type,
    value,
}: {
    date: string;
    type: string;
    value: string;
}) => (
    <View style={styles.orderListRowValuesContainer}>
        <Text style={[Body.small, styles.orderListRowValue1]}>{date}</Text>
        <Text style={[Body.small, styles.orderListRowValue1]}>{type}</Text>
        <Text style={[Heading.h1, styles.orderListRowValue2]}>R${value}</Text>
    </View>
);

export const ordersMock = [
    {
        id: '0',
        client: 'Afonso Pereira',
        status: 'Aguardando',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '1',
        client: 'Afonso Pereira',
        status: 'Enviado',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '2',
        client: 'Afonso Pereira',
        status: 'Enviado',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '3',
        client: 'Afonso Pereira',
        status: 'Aguardando',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '4',
        client: 'Afonso Pereira',
        status: 'Aguardando',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '5',
        client: 'Afonso Pereira',
        status: 'Aguardando',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '6',
        client: 'Afonso Pereira',
        status: 'Aguardando',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
    {
        id: '7',
        client: 'Afonso Pereira',
        status: 'Enviado',
        sellDate: '24/01/2022',
        type: 'Orçamento',
        profit: '195,90',
    },
];

export const filterChipsMock = [
    { id: 0, text: 'Todos' },
    { id: 1, text: 'Enviados' },
    { id: 2, text: 'Aguardando' },
    { id: 3, text: 'Pedidos' },
    { id: 4, text: 'Orçamentos' },
];

export const Separator = () => <View style={styles.separator} />;

export const OrdersListHeader = () => (
    <View style={styles.orderListCleanFilterContainer}>
        <Text style={[Body.small, styles.orderListCleanFilterContainerHeader1]}>
            Limpar filtros
        </Text>
        <Text style={[Body.small, { color: Color.neutral.boulder }]}>
            102 resultados
        </Text>
    </View>
);

export const OrderListRow = ({
    order: { client, status, sellDate, type, profit },
    goToDetails,
}: {
    order: any;
    goToDetails: () => void;
}) => (
    <TouchableOpacity style={styles.orderListRowButton} onPress={goToDetails}>
        <View style={styles.flexOne}>
            <View style={styles.orderListRowButtonHeader}>
                <Text style={[Subtitle[1], styles.orderListRowButtonHeaderText]}>
                    {client}
                </Text>
                <View style={styles.flexOne}>
                    <ButtonChip
                        text={status}
                        textColor={Color.neutral.white}
                        backgroundColor={
                            status === 'Enviado'
                                ? Color.primary.riptide
                                : Color.primary.royalBlue
                        }
                        alignSelf="center"
                    />
                </View>
            </View>
            <OrderListRowSubtitle />
            <OrderListRowValues date={sellDate} type={type} value={profit} />
        </View>
        <Icon
            name="arrow"
            size={18}
            color={Color.neutral.black}
            style={styles.orderListRowIcon}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginHorizontal: Spacing[32],
        marginVertical: Spacing[20],
    },
    orderListCleanFilterContainer: {
        flexDirection: 'row',
        marginHorizontal: Spacing[24],
        marginTop: Spacing[16],
        marginBottom: Spacing[20],
    },
    orderListCleanFilterContainerHeader1: {
        color: Color.primary.royalBlue,
        flex: 1,
    },
    orderListRowSubtitleContainer: { flexDirection: 'row', marginTop: Spacing[14] },
    orderListSubtitle1: { color: Color.neutral.boulder, flex: 1 },
    orderListSubtitle2: {
        color: Color.neutral.boulder,
        flex: 2,
        textAlign: 'center',
    },
    orderListRowButton: { marginHorizontal: Spacing[24], flexDirection: 'row' },
    orderListRowIcon: { alignSelf: 'center', transform: [{ rotate: '180deg' }] },
    orderListRowValuesContainer: { flexDirection: 'row', marginTop: Spacing[4] },
    orderListRowValue1: { color: Color.neutral.black, flex: 1 },
    orderListRowValue2: {
        color: Color.neutral.black,
        flex: 2,
        textAlign: 'center',
    },
    flexOne: { flex: 1 },
    orderListRowButtonHeader: { flexDirection: 'row', alignItems: 'center' },
    orderListRowButtonHeaderText: { color: Color.neutral.black, flex: 1 },
});

