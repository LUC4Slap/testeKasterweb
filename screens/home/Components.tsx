import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Icon } from '../../components';
import { Color, Spacing, Subtitle } from '../../styles';

export const Container = ({ children }: { children: React.ReactElement[] | Element; }) => (
    <ScrollView style={styles.container}>{children}</ScrollView>
);

interface ButtonTypes {
    text: string;
    icon: string;
    marginTop?: number;
    marginBottom?: number;
    navigationFunction: () => void;
    subtitle?: boolean;
    subtitleText?: string;
    arrowIcon?: boolean;
}
export const ButtonWithIcon = ({
    text,
    icon,
    marginTop,
    marginBottom,
    navigationFunction,
    subtitle,
    subtitleText,
    arrowIcon,
}: ButtonTypes) => (
    <TouchableOpacity
        style={[styles.button, { marginTop, marginBottom }]}
        onPress={navigationFunction}>
        <Icon name={icon} size={24} color={Color.primary.riptide} />
        <Text style={[styles.buttonText]}>
            {text}
            {subtitle && (
                <Text style={styles.subtitleSync}>
                    {'\n'}
                    {subtitleText}
                </Text>
            )}
        </Text>
        {arrowIcon && (
            <Icon
                name="arrow"
                size={18}
                color={Color.primary.riptide}
                style={styles.buttonWithIcon}
            />
        )}
    </TouchableOpacity>
);

export const ImportantInformations = ({
    left,
    right,
}: {
    left: React.ReactElement | false | Element;
    right: React.ReactElement;
}) => (
    <View style={styles.importantInformationsLeft}>
        {left}
        <View style={styles.importantInformationsRight}>{right}</View>
    </View>
);

export const SubtitleHeader = ({ text }: { text: string; }) => (
    <Text style={[styles.screenHeader, styles.marginTop8, Subtitle[2]]} numberOfLines={2}>
        {text}
    </Text>
);

export const Header = ({ text }: { text: string; }) => (
    <Text numberOfLines={2} style={[styles.screenHeader, Subtitle[1]]}>
        {text}
    </Text>
);

export const HeaderImage = ({ blob }: { blob: string; }) => (
    <View style={styles.imageContainerLogo}>
        <Image
            source={{
                uri: `data:image/png;base64,${blob}`,
            }}
            style={styles.imageLogo}
            resizeMethod="resize"
            resizeMode="contain"
        />
    </View>
);

export const SubHeader = ({ text }: { text: string; }) => (
    <Text style={[styles.screenHeader, Subtitle[2], styles.marginTop8]}>
        {text}
    </Text>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.primary.royalBlue,
        flex: 1,
        paddingHorizontal: Spacing[32],
    },
    button: { flexDirection: 'row', alignItems: 'center' },
    buttonText: {
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fontSize: 14,
        letterSpacing: -0.24,
        color: 'white',
        marginLeft: 24,
    },
    subtitleSync: {
        fontFamily: 'Helvetica-Light-Oblique',
        color: Color.primary.riptide,
        fontSize: 12,
        lineHeight: 20,
    },
    buttonWithIcon: { transform: [{ rotate: '180deg' }], flex: 1 },
    screenHeader: {
        color: Color.neutral.white,
    },
    marginTop8: { marginTop: Spacing[8] },
    importantInformationsRight: { marginLeft: Spacing[16], flex: 1 },
    importantInformationsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing[40],
    },
    imageContainerLogo: {
        width: 80,
        height: 80,
        backgroundColor: Color.neutral.white,
        justifyContent: 'center',
        borderRadius: 8,
    },
    imageLogo: { alignSelf: 'center', width: 58, height: 58 },
});
