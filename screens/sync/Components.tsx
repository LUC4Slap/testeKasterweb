import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Syncing } from '../../frameworks/realm/context';

import { Color, Spacing, Subtitle, UnorderedList } from '../../styles';
import { formatDateTime } from '../../utils/helpers';

//TODO: add tests

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement | false | Element;
}) => <View style={styles.container}>{children}</View>;

type ISync = { item: Syncing, callback: (item: Syncing) => void; };
export const ListRow = ({ item, callback }: ISync) => {
    return (
        <TouchableOpacity style={styles.listRow} onPress={() => callback(item)}>
            <Text style={[UnorderedList.large, styles.listRowTitle]}>{item.name}</Text>
            <Text style={[Subtitle[2], styles.listRowSubtitle]}>{`Última atualização ${item.last_sync ? formatDateTime(item.last_sync.toISOString()) : "-"}`}</Text>
        </TouchableOpacity>
    );
};

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    listRow: {
        paddingHorizontal: 16,
    },
    listRowTitle: { color: Color.neutral.boulder },
    listRowSubtitle: { color: Color.neutral.black, marginTop: Spacing[4] },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginVertical: Spacing[20],
        marginHorizontal: Spacing[16]
    },
});
