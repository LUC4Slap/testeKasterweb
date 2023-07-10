import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from '../../components';
import { Body, Color, Heading, Spacing, Subtitle, UnorderedList } from '../../styles';

export const FilterSubHeader = ({ length, onPress }: { length: number; onPress: () => void; }) => (
    <View style={styles.productsListCleanFilterContainer}>
        <Text style={[Body.small, styles.productsListCleanFilterContainerHeader1]} onPress={onPress}>
            Limpar filtros
        </Text>
        <Text style={[Body.small, { color: Color.neutral.boulder }]}>
            {length > 50 ? 50 : length} resultado(s)
        </Text>
    </View>
);

type IItemRow = {
    name: string,
    quantity: number,
    total: number,
    onPress: () => void;
};
export const ItemRow = ({ name, quantity, total, onPress }: IItemRow) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.rowWrapper, { justifyContent: 'center' }]}>
                <Text style={[Subtitle[1], styles.rowTitle]} numberOfLines={2}>{name}</Text>
                <Icon
                    name="arrow"
                    size={12}
                    color={Color.neutral.black}
                    style={{ alignSelf: 'center', transform: [{ rotate: '180deg' }], flex: 1 }}
                />
            </View>
            <View style={styles.rowWrapper}>
                <Text style={[Subtitle[3], { color: Color.neutral.boulder, flex: 1, marginTop: 6 }]}>Quantidade</Text>
                <Text style={[UnorderedList.small, styles.rowValue]}>{quantity}</Text>
            </View>
            <View style={styles.rowWrapper}>
                <Text style={[Subtitle[3], { color: Color.neutral.boulder, flex: 1, marginTop: 4 }]}>Valor de venda</Text>
                <Text style={[Heading.h1, styles.rowValue]}>R$ {total}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const Separator = () => <View style={styles.separator} />;

export const TotalsWrapper = ({ children }: { children: React.ReactElement[]; }) => {
    return (
        <View style={{ paddingHorizontal: Spacing[16] }}>
            {children}
        </View>
    );
};
export const TotalsTitle = ({ text }: { text: string; }) => <Text style={[Subtitle[2], { color: Color.primary.royalBlue, marginTop: Spacing[16] }]}>{text}</Text>;
export const TotalsSeparator = () => <View style={{ borderBottomWidth: 1, borderBottomColor: Color.neutral.silver, marginTop: 10 }} />;

export const TotalsRow = ({ header, content }: { header: string, content: string; }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: Spacing[16] }}>
            <Text style={[Subtitle[3], { flex: 1, color: Color.neutral.boulder }]}>{header}</Text>
            <Text style={[UnorderedList.small, { flex: 1, textAlign: 'right', color: Color.neutral.black }]}>{content}</Text>
        </View>
    );
};

export const TotalsTotalRow = ({ header, content }: { header: string, content: string; }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: Spacing[16], marginBottom: Spacing[12], alignItems: 'center' }}>
            <Text style={[Subtitle[3], { flex: 1, color: Color.neutral.boulder }]}>{header}</Text>
            <Text style={[Heading.h1, { flex: 1, textAlign: 'right', color: Color.neutral.black }]}>{content}</Text>
        </View>
    );
};

type ISummaryRow = {
    header: string,
    subheader: string,
    edit?: boolean,
    marginTop?: ViewStyle['marginTop'],
    marginHorizontal?: ViewStyle['marginHorizontal'];
    onPress?: () => void;
};
export const SummaryRow = ({ header, subheader, edit = true, marginTop, marginHorizontal, onPress }: ISummaryRow) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop, marginHorizontal }} onPress={onPress}>
            <View style={{ flex: 4 }}>
                <Text style={[Subtitle[3], { color: Color.neutral.boulder }]}>{header}</Text>
                <Text style={[Subtitle[2], { color: Color.neutral.black }]}>{subheader}</Text>
            </View>
            {edit && <Text style={[Subtitle[3], { flex: 1, color: Color.semantic.froly, textAlign: 'right' }]}>Editar</Text>}
        </TouchableOpacity>
    );
};

export const Container = ({ children }: { children: any; }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};
const styles = StyleSheet.create({
    container: { backgroundColor: 'white', flex: 1 },
    productsListCleanFilterContainer: {
        flexDirection: 'row',
        marginHorizontal: Spacing[24],
        marginTop: Spacing[16],
        marginBottom: Spacing[20],
    },
    productsListCleanFilterContainerHeader1: {
        color: Color.primary.royalBlue,
        flex: 1,
    },
    rowWrapper: { flex: 1, flexDirection: 'row' },
    rowTitle: { flex: 2, color: Color.neutral.black },
    rowValue: { flex: 1, textAlign: 'right', color: Color.neutral.black },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginVertical: Spacing[20],
    },
});

type IMockData = {};