import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';
import { ButtonChip, Icon } from '../../components';
import { Body, Color, Heading, Spacing, Subtitle } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

//TODO: add typing
enum ISubtitle {
    all = 'all',
    marca = 'marca',
    categoria = 'categoria',
    // grupo = 'grupo',
    // subgrupo = 'subgrupo'
}
type IFilter = { id: number, text: string, subtitle: ISubtitle; };
export const filterChipsMock: Array<IFilter> = [
    { id: 0, text: 'Todos', subtitle: ISubtitle.all },
    { id: 1, text: 'Marcas', subtitle: ISubtitle.marca },
    { id: 2, text: 'Categorias', subtitle: ISubtitle.categoria },
    // { id: 3, text: 'Grupos', subtitle: ISubtitle.grupo },
    // { id: 4, text: 'Subgrupos', subtitle: ISubtitle.subgrupo },
];

export const ProductsListHeader = ({ length, onPress }: { length: number; onPress: () => void; }) => (
    <View style={styles.productsListCleanFilterContainer}>
        <Text style={[Body.small, styles.productsListCleanFilterContainerHeader1]} onPress={onPress}>
            Limpar filtros
        </Text>
        <Text style={[Body.small, { color: Color.neutral.boulder }]}>
            {length > 50 ? 50 : length} resultado(s)
        </Text>
    </View>
);

const ProductsListRowHeader = ({
    title,
    status,
}: {
    title: string;
    status: string;
}) => (
    <View style={styles.productsListRowHeaderContainer}>
        <Text
            numberOfLines={1}
            style={[Subtitle[1], styles.productsListRowButtonHeaderText]}>
            {title}
        </Text>
        <View style={styles.flexTwo}>
            <ButtonChip
                text={status}
                textColor={Color.neutral.white}
                backgroundColor={
                    status === 'Disponível' ? Color.primary.riptide : Color.neutral.silver
                }
                alignSelf="center"
            />
        </View>
    </View>
);

const ProductsListRowSubtitle = () => (
    <View style={styles.productsListRowSubtitleContainer}>
        <Text style={[Subtitle[3], styles.productsListSubtitle1]}>Grupo</Text>
        <Text
            style={[
                Subtitle[3],
                styles.productsListSubtitle1,
                styles.textAlignCenter,
            ]}>
            Qtd.
        </Text>
        <Text
            style={[
                Subtitle[3],
                styles.productsListSubtitle1,
                styles.textAlignCenter,
            ]}>
            Cód
        </Text>
        <Text style={[Subtitle[3], styles.productsListSubtitle2]}>
            Valor de venda
        </Text>
    </View>
);

interface ProductsListValuesType {
    group: string;
    quantity: number;
    code: string;
    sellingPrice: string;
}
const ProductsListRowValues = ({
    group,
    quantity,
    code,
    sellingPrice,
}: ProductsListValuesType) => (
    <View style={styles.productsListRowValuesContainer}>
        <Text style={[Body.small, styles.productsListRowValue1]}>{group}</Text>
        <Text
            style={[
                Body.small,
                styles.productsListRowValue1,
                styles.textAlignCenter,
            ]}>
            {quantity}
        </Text>
        <Text
            style={[
                Body.small,
                styles.productsListRowValue1,
                styles.textAlignCenter,
            ]}>
            {code}
        </Text>
        <Text style={[Heading.h1, styles.productsListRowValue2]}>
            R${sellingPrice}
        </Text>
    </View>
);

interface ProductsListTypes {
    product: {
        nome: string;
        grupo_nome: string;
        estoque: number;
        sku: string;
        preco: number;
    };
    goToDetails: () => void;
}
export const ProductsListRow = ({
    product: { nome, grupo_nome, estoque, sku, preco },
    goToDetails,
}: ProductsListTypes) => (
    <TouchableOpacity style={styles.productsListRowButton} onPress={goToDetails}>
        <View style={styles.flexOne}>
            <ProductsListRowHeader title={nome} status={estoque > 0 ? 'Disponível' : 'Sem Estoque'} />
            <ProductsListRowSubtitle />
            <ProductsListRowValues
                group={grupo_nome}
                quantity={estoque}
                code={sku}
                sellingPrice={preco.toFixed(2)}
            />
        </View>
        <Icon
            name="arrow"
            size={18}
            color={Color.neutral.black}
            style={styles.productsListRowIcon}
        />
    </TouchableOpacity>
);

export const productsMock = [
    {
        id: '0',
        headerText: 'Joelho Azul 25 1/2 LOREM IPSUM DOLOR SIT AMET CONSECTUR',
        group: 'Hidráulico',
        quantity: 100,
        code: 1001574,
        status: 'Disponível',
        sellingPrice: '2,90',
    },
    {
        id: '1',
        headerText: 'Assento Sanit. Bellart Oval em Polipropileno Plus',
        group: 'Banheiro',
        quantity: 0,
        code: 1001574,
        status: 'Sem estoque',
        sellingPrice: '2,90',
    },
    {
        id: '2',
        headerText: 'Assento Sanit. Bellart Oval em Polipropileno Plus',
        group: 'Banheiro',
        quantity: 0,
        code: 1001574,
        status: 'Sem estoque',
        sellingPrice: '7,20',
    },
    {
        id: '3',
        headerText: 'Joelho Azul 25 1/2 LOREM IPSUM DOLOR SIT AMET CONSECTUR',
        group: 'Hidráulico',
        quantity: 0,
        code: 1001574,
        status: 'Sem estoque',
        sellingPrice: '20,90',
    },
    {
        id: '4',
        headerText: 'Assento Sanit. Bellart Oval em Polipropileno Plus',
        group: 'Banheiro',
        quantity: 0,
        code: 1001574,
        status: 'Sem estoque',
        sellingPrice: '4,90',
    },
    {
        id: '5',
        headerText: 'Joelho Azul 25 1/2 LOREM IPSUM DOLOR SIT AMET CONSECTUR',
        group: 'Hidráulico',
        quantity: 74,
        code: 1001574,
        status: 'Disponível',
        sellingPrice: '6,90',
    },
    {
        id: '6',
        headerText: 'Joelho Azul 25 1/2 LOREM IPSUM DOLOR SIT AMET CONSECTUR',
        group: 'Hidráulico',
        quantity: 0,
        code: 1001574,
        status: 'Sem estoque',
        sellingPrice: '15,90',
    },
    {
        id: '7',
        headerText: 'Assento Sanit. Bellart Oval em Polipropileno Plus',
        group: 'Banheiro',
        quantity: 231,
        code: 1001574,
        status: 'Disponível',
        sellingPrice: '15,00',
    },
];

export const Separator = () => <View style={styles.separator} />;


type IModalWrapper = {
    isVisible: boolean;
    setVisible: () => void;
    title: string;
    subtitle: string;
    children: React.ReactElement[];
};
export const ModalWrapper = ({ isVisible, setVisible, title, subtitle, children }: IModalWrapper) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setVisible()}
        >
            <View style={styles.modalWrapper}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible()} />
                <View style={styles.bottomMenu}>
                    <Text style={[Heading.h1, { color: Color.neutral.black }]}>
                        {title}
                    </Text>
                    <Text style={[Subtitle[3], styles.modalSubtitle]}>
                        Deslize para selecionar algum(a) {subtitle.toLocaleLowerCase()}:
                    </Text>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export const FilterText = ({ text, onPress }: { text: string; onPress: () => void; }) => <Text style={styles.filterText} onPress={onPress}>{text}</Text>;

const { height } = Dimensions.get('screen');
const rowHeight = height * .096;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
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
    productsListRowSubtitleContainer: {
        flexDirection: 'row',
        marginTop: Spacing[14],
    },
    productsListSubtitle1: { color: Color.neutral.boulder, flex: 1 },
    productsListSubtitle2: {
        color: Color.neutral.boulder,
        flex: 2,
        textAlign: 'center',
    },
    productsListRowButtonHeaderText: { color: Color.neutral.black, flex: 3 },
    productsListRowValuesContainer: { flexDirection: 'row', marginTop: Spacing[4] },
    productsListRowValue1: { color: Color.neutral.black, flex: 1 },
    productsListRowValue2: {
        color: Color.neutral.black,
        flex: 2,
        textAlign: 'center',
    },
    textAlignCenter: { textAlign: 'center' },
    productsListRowHeaderContainer: { flexDirection: 'row', alignItems: 'center' },
    productsListRowButton: { marginHorizontal: Spacing[24], flexDirection: 'row', height: rowHeight },
    productsListRowIcon: { alignSelf: 'center', transform: [{ rotate: '180deg' }] },
    flexOne: { flex: 1 },
    flexTwo: { flex: 2 },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginHorizontal: Spacing[32],
        marginVertical: Spacing[20],
    },
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.4)',
        justifyContent: 'flex-end'
    },
    bottomMenu: {
        backgroundColor: 'white',
        height: height * .44,
        borderTopLeftRadius: 16,
        borderTopEndRadius: 16,
        paddingHorizontal: 18,
        paddingTop: Spacing[40]

    },
    modalSubtitle: { color: Color.neutral.boulder, marginTop: Spacing[8] },
    filterContainer: { marginTop: 20, height: height * .18, backgroundColor: Color.neutral.wildSand },
    filterText: { height: 50, textAlign: 'center', textAlignVertical: 'center', color: Color.neutral.black }
});

export const componentStyles = {
    filterContainer: styles.filterContainer
};