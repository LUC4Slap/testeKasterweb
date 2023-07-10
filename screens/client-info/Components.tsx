import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { Color, Spacing, Subtitle, UnorderedList } from "../../styles";

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

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
            { marginTop: marginTop || undefined, color: color || Color.neutral.boulder },
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    sectionTitle: { color: Color.neutral.boulder },
    sectionSubtitle: { color: Color.neutral.black },
    marginHorizontal16: { marginHorizontal: Spacing[16] },
    flexOne: { flex: 1 }
});