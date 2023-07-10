import React from 'react';
import { StyleSheet, Switch, Text, TextStyle, View } from 'react-native';
import { Body, Color, Spacing, Subtitle } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

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
export const SectionTitle = ({
    title,
    marginTop,
    color
}: {
    title: string;
    marginTop?: TextStyle['marginTop'];
    color?: TextStyle['color'];
}) => (
    <Text
        style={[
            Subtitle[3],
            styles.sectionTitle,
            styles.marginHorizontal16,
            { marginTop: marginTop || undefined, color },
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
            Body.small,
            styles.sectionSubtitle,
            styles.marginHorizontal16,
            { marginTop: marginTop || undefined },
        ]}>
        {subtitle}
    </Text>
);

export const SwitchRowContainer = ({
    leftSection,
    SwitchSide,
}: {
    leftSection: React.ReactElement[] | React.ReactElement;
    SwitchSide: React.ReactElement[] | React.ReactElement;
}) => (
    <View style={styles.switchRowContainer}>
        <View>{leftSection}</View>
        <View style={styles.switchRowContainerRightSide}>{SwitchSide}</View>
    </View>
);

export const SwitchContainer = ({
    onValueChange,
    value,
}: {
    onValueChange: () => void;
    value: boolean;
}) => (
    <Switch
        trackColor={{ false: Color.neutral.boulder, true: Color.primary.riptide }}
        thumbColor={Color.neutral.white}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
    />
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    sectionHeader: {
        marginBottom: Spacing[12],
    },
    sectionTitle: { color: Color.neutral.black },
    sectionSubtitle: { color: Color.neutral.boulder },
    marginHorizontal16: { marginHorizontal: Spacing[16] },
    switchRowContainer: { flexDirection: 'row' },
    switchRowContainerRightSide: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
        marginRight: Spacing[16],
    },
});
