import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, Color, Spacing, Subtitle } from '../../styles';

export const InputSubtitle = ({ text }: { text: string; }) => (
    <Text style={[Body.small, styles.inputSubtitle]}>{text}</Text>
);

export const InputSubtitleContainer = ({
    children,
}: {
    children: React.ReactElement[];
}) => <View style={styles.inputSubtitleContainer}>{children}</View>;

export const HasAccount = ({
    firstSentence,
    secondSentence,
    onPress,
}: {
    firstSentence: string;
    secondSentence: string;
    onPress: () => void;
}) => (
    <Text onPress={onPress} style={[Subtitle[2], styles.hasAccount]}>
        {firstSentence}
        <Text style={[Button.default]}> {secondSentence}</Text>
    </Text>
);

export const Container = ({ children }: { children: React.ReactElement[] | Element; }) => (
    <ScrollView
        style={[
            {
                backgroundColor: Color.primary.royalBlue,
                paddingHorizontal: Spacing[16],
            },
            styles.flexOne,
        ]}>
        {children}
    </ScrollView>
);

export const BottonRow = ({ children }: { children: React.ReactNode[]; }) => (
    <View style={styles.buttonsRow}>
        {children}
    </View>
);

export const CancelButton = ({ onCancel }: { onCancel: () => void; }) => (
    <Text onPress={onCancel} style={[Button.default, styles.cancelButton]}>
        Cancelar
    </Text>
);
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.primary.royalBlue,
        flex: 1,
        paddingHorizontal: Spacing[16],
    },
    fieldTitle: { color: Color.neutral.white, marginTop: Spacing[40] },
    formTitle: { color: Color.neutral.white, marginTop: Spacing[56] },
    cancelButton: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: Spacing[8],
        color: Color.neutral.white,
        paddingHorizontal: Spacing[16],
    },
    buttonsRow: {
        flexDirection: 'row',
        flex: 1,
        marginTop: Spacing[8],
        marginBottom: Spacing[20],
    },
    openImageLibrary: {
        backgroundColor: Color.neutral.white,
        flex: 1,
        height: 92,
        marginTop: Spacing[14],
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    hasAccount: {
        color: Color.primary.riptide,
        marginTop: Spacing[12],
        marginBottom: Spacing[14],
        textAlign: 'center',
    },
    flexOne: { flex: 1 },
    inputSubtitle: {
        color: Color.primary.riptide,
        flex: 1,
        marginLeft: Spacing[16],
    },
    inputSubtitleContainer: { flexDirection: 'row', alignItems: 'center' },
});
