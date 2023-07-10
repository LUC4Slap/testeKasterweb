import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from '../../components';
import { Button, Color, Heading, Spacing, Subtitle, UnorderedList } from '../../styles';
import { CNPJMask } from '../../utils/helpers';

export const Container = ({ children }: { children: React.ReactElement[] | Element; }) => (
    <View style={styles.container}>{children}</View>
);

export const FieldTitle = ({ text }: { text: string; }) => (
    <Text style={[Subtitle[2], styles.fieldTitle]}>{text}</Text>
);

export const Header = ({
    text,
    infoIcon,
    infoIconFn,
    marginBottom,
}: {
    text: string;
    infoIcon?: boolean;
    infoIconFn?: () => void;
    marginBottom?: ViewStyle['marginBottom'];
}) =>
    <View style={[styles.header, { marginBottom: marginBottom || undefined }]}>
        <Text style={[Heading.h1, styles.headerText]}>{text}</Text>
        {infoIcon && (
            <Icon
                name="log-out"
                color={Color.primary.royalBlue}
                size={24}
                onPress={infoIconFn}
            />
        )}
    </View>;

export const RegisterCompany = ({
    firstSentence,
    secondSentence,
    onPress,
}: {
    firstSentence: string;
    secondSentence: string;
    onPress: () => void;
}) => (
    <Text onPress={onPress} style={[Subtitle[2], styles.trialText]}>
        {firstSentence}
        <Text style={[Button.default]}> {secondSentence}</Text>
    </Text>
);
const dimension = Dimensions.get('screen');

const ListRowIndicator = () => (
    <Text style={[Button.default, styles.listIndicator]}>Em uso</Text>
);

const ListRowIndicatorEmpty = () => (
    <Text style={[Button.default, styles.listIndicator]}> </Text>
);

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
    container: {
        backgroundColor: Color.neutral.white,
        flex: 1,
    },
    headerText: { flex: 1, color: Color.neutral.black },
    header: {
        flexDirection: 'row',
        marginHorizontal: Spacing[16],
        marginTop: Spacing[24],
        alignItems: 'center',
    },
    icon: { padding: Spacing[4] },
    fieldTitle: { color: Color.neutral.white, marginTop: Spacing[40] },
    trialText: {
        color: Color.primary.riptide,
        marginTop: `${dimension.height * 0.046}%`,
        textAlign: 'center',
    },
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
