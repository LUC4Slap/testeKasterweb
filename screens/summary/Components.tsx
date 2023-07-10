import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonChip, Icon } from '../../components';
import { Button, Color, Spacing, Subtitle, UnorderedList } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

export const Pagination = () => (
    <View style={styles.paginationContainer}>
        <Icon name="arrow" color={Color.neutral.boulder} size={16} />
        <Text style={[Button.default, styles.paginationText]}>2020</Text>
        <Icon
            name="arrow"
            color={Color.neutral.boulder}
            size={16}
            style={styles.arrowRight}
        />
    </View>
);

export const ListHeader = () => (
    <View style={styles.listHeaderContainer}>
        <View>
            <Text style={[Subtitle[1], styles.listHeaderMonth]}>Agosto</Text>
            <ButtonChip text="Em aberto" marginTop={12} />
        </View>
        <View style={styles.subtitleRowContainer}>
            <View style={styles.subtitleRow}>
                <Text style={[Subtitle[3], styles.listHeaderSubtitle]}>
                    Valor aguardando
                </Text>
                <Text
                    style={[
                        Subtitle[3],
                        styles.listHeaderSubtitleCurrency,
                        { color: Color.primary.royalBlue },
                    ]}>
                    R$450,00
                </Text>
            </View>
            <View style={styles.subtitleRow}>
                <Text style={[Subtitle[3], styles.listHeaderSubtitle]}>
                    Valor enviado
                </Text>
                <Text
                    style={[
                        Subtitle[3],
                        styles.listHeaderSubtitleCurrency,
                        { color: Color.primary.royalBlue },
                    ]}>
                    R$4002,22
                </Text>
            </View>
            <View style={styles.subtitleRow}>
                <Text style={[Subtitle[3], styles.listHeaderSubtitle]}>
                    Valor Total
                </Text>
                <Text
                    style={[
                        Button.default,
                        styles.listHeaderSubtitleCurrency,
                        { color: Color.neutral.black },
                    ]}>
                    R$450,00
                </Text>
            </View>
        </View>
    </View>
);

export const listRow = ({
    item: { month, value },
}: {
    item: { month: string; value: string; };
}) => (
    <View style={styles.listRow}>
        <Text style={[UnorderedList.medium, styles.listRowTitle]}>{month}</Text>
        <Text style={[Button.default, styles.listRowCurrency]}>R${value}</Text>
    </View>
);

export const mockData = [
    { id: '0', month: 'Julho', value: '450,00' },
    { id: '1', month: 'Agosto', value: '450,00' },
    { id: '2', month: 'Setembro', value: '450,00' },
    { id: '3', month: 'Outubro', value: '450,00' },
    { id: '4', month: 'Novembro', value: '450,00' },
    { id: '5', month: 'Dezembro', value: '450,00' },
    { id: '6', month: 'Janeiro', value: '450,00' },
    { id: '7', month: 'Fevereiro', value: '450,00' },
    { id: '8', month: 'Março', value: '450,00' },
    { id: '9', month: 'Abril', value: '450,00' },
    { id: '10', month: 'Junho', value: '450,00' },
];

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.neutral.wildSand,
        paddingHorizontal: Spacing[16],
        paddingVertical: Spacing[16],
    },
    paginationText: { textAlign: 'center', color: Color.neutral.boulder, flex: 1 },
    arrowRight: { transform: [{ rotateY: '180deg' }] },
    listHeaderContainer: {
        marginHorizontal: Spacing[32],
        flexDirection: 'row',
        marginBottom: Spacing[20],
        marginTop: Spacing[24],
    },
    listHeaderMonth: { color: Color.neutral.black },
    listHeaderSubtitle: { flex: 1, textAlign: 'left' },
    listHeaderSubtitleCurrency: { textAlign: 'left' },
    subtitleRowContainer: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: Spacing[12],
        marginTop: 6,
    },
    subtitleRow: { flex: 1, flexDirection: 'row' },
    listRow: {
        flexDirection: 'row',
        marginHorizontal: Spacing[32],
        height: 61,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listRowTitle: { flex: 1, color: Color.neutral.boulder },
    listRowCurrency: { color: Color.neutral.black },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginHorizontal: Spacing[16],
    },
});
