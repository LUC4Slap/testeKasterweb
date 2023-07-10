import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Button, Color, Spacing, Subtitle, UnorderedList } from '../../styles';
import { CNPJMask } from '../../utils/helpers';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement | false | Element;
}) => <View style={styles.container}>{children}</View>;

const ListRowLeftSide = ({
    companyName,
    companyCNPJ,
}: {
    companyName: string;
    companyCNPJ: string;
}) => (
    <View style={styles.listRowLeftSide}>
        <Text style={[UnorderedList.large, styles.listRowTitle]}>
            {companyName}
        </Text>
        <Text style={[Subtitle[2], styles.listRowSubtitle]}>
            {CNPJMask(companyCNPJ)}
        </Text>
    </View>
);

const ListRowIndicator = () => (
    <Text style={[Button.default, styles.listIndicator]}>Em uso</Text>
);

const ListRowIndicatorEmpty = () => (
    <Text style={[Button.default, styles.listIndicator]}> </Text>
);

interface ListType {
    index: string;
    currentIndex: string | undefined;
    onPress: () => void;
    marginTop?: ViewStyle['marginTop'];
    companyName: string;
    companyCNPJ: string;
}
export const ListRow = ({
    index,
    currentIndex,
    onPress,
    marginTop,
    companyName,
    companyCNPJ,
}: ListType) => (
    <TouchableOpacity
        onPress={onPress}
        style={[{ marginTop: marginTop || undefined }, styles.listRow]}>
        <ListRowLeftSide companyName={companyName} companyCNPJ={companyCNPJ} />
        {index === currentIndex && <ListRowIndicator />}
        {index !== currentIndex && <ListRowIndicatorEmpty />}
    </TouchableOpacity>
);

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    flexOne: { flex: 1 },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginVertical: Spacing[20],
    },
    listRow: { flexDirection: 'row', alignItems: 'center' },
    listRowTitle: { color: Color.neutral.boulder },
    listRowSubtitle: { color: Color.neutral.black, marginTop: Spacing[4] },
    listRowLeftSide: { flexDirection: 'column', justifyContent: 'center', flex: 5 },
    listIndicator: { color: Color.primary.royalBlue, flex: 1 },
});
