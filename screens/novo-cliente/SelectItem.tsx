import React, { ReactElement } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, View } from 'react-native';

import { BasicButton, NoResultFound } from "../../components";
import { Color, Heading, Spacing, UnorderedList } from "../../styles";

type ISelectItem = {
    isVisible: boolean,
    setVisible: () => void,
    screenTitle: string,
    children: ReactElement,
};
export const SelectItem = ({ isVisible, screenTitle, setVisible, children }: ISelectItem) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setVisible()}
        >
            <View style={styles.contentContainer}>
                <Text style={[Heading.h1, styles.title]}>{screenTitle}</Text>
                {children}
                <BasicButton
                    text="Cancelar"
                    colorText={Color.neutral.white}
                    colorButton={Color.semantic.froly}
                    marginHorizontal={Spacing[16]}
                    marginTop={Spacing[40]}
                    marginBottom={Spacing[14]}
                    onPress={setVisible}
                />
            </View>
        </Modal>
    );
};

type IItemsList = {
    data: readonly any[] | null | undefined,
    renderItem: ListRenderItem<any> | null | undefined;
};
export const ItemsList = ({ data, renderItem }: IItemsList) => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={NoResultFound}
            ItemSeparatorComponent={Separator}
            style={{ paddingHorizontal: Spacing[24] }}
        />
    );
};

type IListItem = {
    name: string,
    code: number,
    onPress: () => void;
};
export const ListItem = ({ name, code, onPress }: IListItem) => {
    return (
        <Text
            onPress={onPress}
            style={[UnorderedList.medium, styles.listItemTextColor]}>
            {code} - {name}
        </Text>
    );
};

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: Color.neutral.white, flex: 1
    },
    title: {
        color: Color.neutral.black,
        marginHorizontal: Spacing[24],
        marginTop: Spacing[24],
        marginBottom: Spacing[40]
    },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginVertical: Spacing[20],
    },
    listItemTextColor: { color: Color.neutral.black }
});

export const mockData = [
    { id: '0', name: 'Pluto Pradip', code: 83 },
    { id: '1', name: 'Veronika Rüstem', code: 265 },
    { id: '2', name: 'Kazimieras Fehime', code: 236 },
    { id: '3', name: 'Hyginus Avetis', code: 719 },
    { id: '4', name: 'Granville Gertruda', code: 323 },
    { id: '5', name: 'Edmund Vegard', code: 968 },
    { id: '6', name: 'Hermina Rhydderch', code: 550 },
    { id: '7', name: 'Sunita Mathúin', code: 265 },
    { id: '8', name: 'Titrit Amalric', code: 362 },
    { id: '9', name: 'Charmian Vladyslav', code: 430 },
    { id: '10', name: 'Iesous Camilla', code: 268 },
    { id: '11', name: 'Toufik Vishal', code: 907 },
];

export const mockTabelaPrecoId = [
    { id: '0', name: 'Padrão', code: 83 },
    { id: '1', name: 'Exportação', code: 265 },
    { id: '2', name: 'Importação', code: 236 },
    { id: '3', name: 'Especial', code: 719 },
    { id: '4', name: 'Nova legislação - 2023', code: 323 },
    { id: '5', name: 'Europa', code: 968 },
    { id: '6', name: 'Brasil', code: 550 },
    { id: '7', name: 'São Paulo', code: 265 },
    { id: '8', name: 'Rio de Janeiro', code: 362 },
    { id: '9', name: 'Belo Horizonte', code: 430 },
    { id: '10', name: 'Mato Grosso', code: 268 },
    { id: '11', name: 'Antiga', code: 907 },
];