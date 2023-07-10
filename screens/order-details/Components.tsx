import React from 'react';
import { FlatList, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";

import { Icon } from '../../components';
import { Button, Color, Heading, Spacing, Subtitle, UnorderedList } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;


type IHeaderArrow = {
    text: string;
    helperText: string;
    colorText: TextStyle['color'];
    colorIcon: TextStyle['color'];
    onPressEdit: () => void;
    onPress: () => void;
};
export const HeaderArrow = ({ text, colorText, colorIcon, helperText, onPress, onPressEdit }: IHeaderArrow) => (
    <View style={styles.headerContainer}>
        <Icon
            name="arrow"
            color={colorIcon}
            size={18}
            onPress={onPress}
        />
        <Text style={[Heading.h1, styles.headerText, { color: colorText }]}>{text}</Text>
        <Text onPress={onPressEdit} style={[Button.default, styles.headerText, { textAlign: 'right', color: Color.primary.royalBlue }]}>{helperText}</Text>
    </View>
);

export const SectionHeader = ({
    title,
    marginTop,
    marginBottom,
    textAlign,
    color,
}: {
    title: string;
    marginTop?: TextStyle['marginTop'];
    marginBottom?: TextStyle['marginBottom'];
    textAlign?: TextStyle['textAlign'];
    color?: TextStyle['color'];
}) => (
    <Text
        style={[
            Subtitle[2],
            styles.sectionHeader,
            styles.marginHorizontal16,
            {
                marginTop: marginTop || undefined,
                marginBottom: marginBottom || undefined,
                textAlign: textAlign || undefined,
                color: color || Color.primary.royalBlue,
            },
        ]}>
        {title}
    </Text>
);

export const Column = ({ flex, children }: { flex: TextStyle['flex'], children: React.ReactElement[]; }) => {
    return (
        <View style={{ flex }}>
            {children}
        </View>
    );
};

export const SectionTitle = ({
    title,
    marginTop,
}: {
    title: string;
    marginTop?: TextStyle['marginTop'];
}) => (
    <Text
        style={[
            Subtitle[3],
            styles.sectionTitle,
            styles.marginHorizontal16,
            { marginTop: marginTop || undefined },
        ]}>
        {title}
    </Text>
);

export const SectionSubTitle = ({
    subtitle,
    marginTop,
}: {
    subtitle: string;
    marginTop?: TextStyle['marginTop'];
}) => (
    <Text
        style={[
            UnorderedList.small,
            styles.sectionSubtitle,
            styles.marginHorizontal16,
            { marginTop: marginTop || undefined },
        ]}>
        {subtitle}
    </Text>
);

export const ItemsList = () => {
    return (
        <FlatList
            data={mockData}
            keyExtractor={item => item.id}
            renderItem={ItemRow}
            maxToRenderPerBatch={50}
            initialNumToRender={50}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.rowsContainer}
        />
    );
};

export const ItemRow = ({ item }: { item: IMockData; }) => {
    return (
        <TouchableOpacity>
            <View style={[styles.rowWrapper, { justifyContent: 'center' }]}>
                <Text style={[Button.default, styles.rowTitle]} numberOfLines={2}>{item.nome}</Text>
                <Icon
                    name="arrow"
                    size={12}
                    color={Color.neutral.black}
                    style={{ alignSelf: 'center', transform: [{ rotate: '180deg' }], flex: 1 }}
                />
            </View>
            <View style={styles.rowWrapper}>
                <Text style={[Subtitle[3], { flex: 1, marginTop: 6 }]}>Quantidade</Text>
                <Text style={[UnorderedList.small, styles.rowValue]}>{item.quantidade} x R$ {item.valor_unitario}</Text>
            </View>
            <View style={styles.rowWrapper}>
                <Text style={[Subtitle[3], { flex: 1, marginTop: 4 }]}>Total</Text>
                <Text style={[Button.default, styles.rowValue]}>R$ {item.total}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const Totals = () => {
    return (
        <View style={{ paddingHorizontal: Spacing[16] }}>
            <TotalsTitle text={'Totais'} />
            <TotalsSeparator />
            <TotalsRow header={'Quantidade'} content={'4'} />
            <TotalsRow header={'Valor Produtos'} content={'R$ 8,95'} />
            <TotalsRow header={'Valor Frete'} content={'R$ 2,90'} />
            <TotalsRow header={'Desconto'} content={'R$ 5,10 (0%)'} />
            <TotalsTotalRow header='Valor da Venda' content='R$ 100,25' />
        </View>
    );
};
const TotalsTitle = ({ text }: { text: string; }) => <Text style={[Subtitle[2], { color: Color.primary.royalBlue, marginTop: Spacing[16] }]}>{text}</Text>;
const TotalsSeparator = () => <View style={{ borderBottomWidth: 1, borderBottomColor: Color.neutral.silver, marginTop: 10 }} />;

const TotalsRow = ({ header, content }: { header: string, content: string; }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: Spacing[16] }}>
            <Text style={[Subtitle[3], { flex: 1, color: Color.neutral.boulder }]}>{header}</Text>
            <Text style={[UnorderedList.small, { flex: 1, textAlign: 'right', color: Color.neutral.black }]}>{content}</Text>
        </View>
    );
};

const TotalsTotalRow = ({ header, content }: { header: string, content: string; }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: Spacing[16], marginBottom: Spacing[12], alignItems: 'center' }}>
            <Text style={[Subtitle[3], { flex: 1, color: Color.neutral.boulder }]}>{header}</Text>
            <Text style={[Heading.h1, { flex: 1, textAlign: 'right', color: Color.neutral.black }]}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    headerContainer: {
        paddingHorizontal: Spacing[16],
        paddingTop: Spacing[24],
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.neutral.white
    },
    headerText: { flex: 1, marginLeft: 20, color: Color.neutral.white },
    sectionSubtitle: { color: Color.neutral.black },
    marginHorizontal16: { marginHorizontal: Spacing[16] },
    sectionTitle: { color: Color.neutral.boulder },
    sectionHeader: {
        marginBottom: Spacing[12],
    },
    separator: { marginVertical: Spacing[16], borderBottomColor: Color.neutral.silver, borderBottomWidth: 1 },
    rowWrapper: { flex: 1, flexDirection: 'row' },
    rowTitle: { flex: 2, color: Color.primary.royalBlue },
    rowValue: { flex: 1, textAlign: 'right', color: Color.neutral.black },
    rowsContainer: { paddingHorizontal: Spacing[16], backgroundColor: Color.neutral.concrete }
});

export type IMockData = {
    id: string;
    nome: string;
    quantidade: number;
    valor_unitario: number;
    total: number;
};

export const mockData: Array<IMockData> = [
    { id: '0', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '1', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '2', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia  Lorem Ipsum dolor sit amet', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '3', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '4', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '5', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '6', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '7', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '8', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '9', nome: 'Válvula para Pia de Cozinha Metal 3.1/2 Delinia', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '10', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '11', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '12', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '13', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '14', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '15', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '16', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '17', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '18', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '19', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '20', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '21', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '22', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '23', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '24', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '25', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '26', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '27', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '28', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '29', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    { id: '30', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '31', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '32', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '33', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '34', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '35', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '36', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '37', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '38', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '39', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '40', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '41', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '42', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '43', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '44', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '45', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '46', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '47', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '48', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '49', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '50', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '51', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '52', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '53', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '54', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '55', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '56', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '57', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '58', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
    // { id: '59', nome: 'Joelho Azul 25 1/2 LR CR', quantidade: 5, valor_unitario: 2.55, total: 12.75 },
];