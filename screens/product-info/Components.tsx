import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TextStyle, View } from 'react-native';

import { ButtonChip, Icon } from '../../components';
import { Body, Color, Heading, Spacing, Subtitle } from '../../styles';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

export const SheetContentContainer = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.bottomSheetContainer}>{children}</View>;

type IHeaderArrow = {
    text: string;
    colorText: TextStyle['color'];
    colorIcon: TextStyle['color'];
    onPress: () => void;
};
export const HeaderArrow = ({ text, colorText, colorIcon, onPress }: IHeaderArrow) => (
    <View style={styles.headerContainer}>
        <Icon
            name="arrow"
            color={colorIcon}
            size={18}
            onPress={onPress}
        />
        <Text style={[Heading.h1, styles.headerText, { color: colorText }]}>{text}</Text>
    </View>
);

export const SheetContentHeader = ({ title, stock }: { title: string; stock: boolean; }) => (
    <View style={styles.sheetContentHeaderContainer}>
        <Text numberOfLines={2} style={[Heading.h2, styles.sheetContentHeaderText]}>
            {title}
        </Text>
        <View style={styles.flexOne}>
            <ButtonChip
                text={stock ? 'Disponível' : 'Sem Estoque'}
                textColor={Color.neutral.white}
                backgroundColor={stock ? Color.primary.riptide : Color.neutral.silver}
                alignSelf="center"
            />
        </View>
    </View>
);

export const dimension = Dimensions.get('screen');
export const imageHeight = dimension.height * 0.41;
export const imageWidth = dimension.width;

export const ProductImage = ({ children }: { children: React.ReactNode[]; }) => (
    <ImageBackground
        source={require('../../assets/app/sample-product-image-1.png')}
        style={styles.image}>
        {children}
    </ImageBackground>
);

export const ImageOverlay = () => <View style={styles.imageOverlay} />;

interface Subtitles {
    first: string;
    second: string;
    third: string;
    alignLastColum?: TextStyle['textAlign'];
}
export const ProductRowSubtitle = ({
    first,
    second,
    third,
    alignLastColum,
}: Subtitles) => (
    <View style={styles.productRowSubtitleContainer}>
        <Text style={[Subtitle[3], styles.productSubtitle1, styles.flexOne]}>
            {first}
        </Text>
        <Text style={[Subtitle[3], styles.productSubtitle1, styles.flexOne]}>
            {second}.
        </Text>
        <Text
            style={[
                Subtitle[3],
                styles.productSubtitle1,
                styles.flexOne,
                { textAlign: alignLastColum },
            ]}>
            {third}
        </Text>
    </View>
);

interface Values {
    first: string;
    second: string;
    third: string;
    alignLastColum?: TextStyle['textAlign'];
    priceHighlight?: boolean;
}
export const ProductRowValues = ({
    first,
    second,
    third,
    alignLastColum,
    priceHighlight,
}: Values) => (
    <View style={styles.productRowValuesContainer}>
        <Text style={[Body.small, styles.productRowValue1, styles.flexOne]}>
            {first}
        </Text>
        <Text style={[Body.small, styles.productRowValue1, styles.flexOne]}>
            {second}
        </Text>
        <Text
            style={[
                priceHighlight ? Heading.h2 : Body.small,
                styles.flexOne,
                {
                    textAlign: alignLastColum,
                    color: priceHighlight ? Color.primary.royalBlue : Color.neutral.black,
                },
            ]}>
            {third}
        </Text>
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

export const DescriptionText = ({ text }: { text: string; }) => (
    <Text style={[Body.small, styles.descriptionText]}>
        {text}
    </Text>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    headerContainer: {
        paddingHorizontal: Spacing[16],
        paddingTop: Spacing[24],
        paddingBottom: Spacing[12],
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: { flex: 1, marginLeft: 20, color: Color.neutral.white },
    buttonText: { color: Color.neutral.black },
    image: { height: imageHeight, width: imageWidth },
    imageOverlay: {
        flex: 1,
        backgroundColor: 'rgba(59,96,242,.5)',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    bottomSheetContainer: {
        flex: 1,
        paddingHorizontal: Spacing[16],
        marginTop: Spacing[32],
    },
    sheetContentHeaderContainer: { flexDirection: 'row', alignItems: 'center' },
    sheetContentHeaderText: { color: Color.neutral.black, flex: 2 },
    productRowSubtitleContainer: {
        flexDirection: 'row',
        marginTop: Spacing[16],
    },
    productSubtitle1: { color: Color.neutral.boulder },
    productRowValuesContainer: { flexDirection: 'row' },
    productRowValue1: { color: Color.neutral.black },
    flexOne: { flex: 1 },
    sectionHeader: {
        marginBottom: Spacing[12],
    },
    descriptionText: { color: Color.neutral.black, marginTop: Spacing[16] },
});
