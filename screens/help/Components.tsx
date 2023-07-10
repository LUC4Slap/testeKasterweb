import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Icon } from '../../components';
import { Body, Color, Heading, Spacing, Subtitle, UnorderedList } from '../../styles';
import { CNPJMask } from '../../utils/helpers';

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement;
}) => <View style={styles.container}>{children}</View>;

const QuestionHeader = ({
    index,
    currentIndex,
    text,
}: {
    index: string;
    currentIndex: string | undefined;
    text: string;
}) => (
    <View style={styles.headerContainer}>
        <Text
            style={[
                index === currentIndex ? Subtitle[1] : UnorderedList.medium,
                styles.questionHeaderText,
            ]}>
            {text}
        </Text>
        <Icon
            name="arrow"
            size={18}
            color={Color.neutral.black}
            style={[
                index !== currentIndex
                    ? styles.orderListRowIcon270
                    : styles.orderListRowIcon90,
                styles.orderListRowIcon,
            ]}
        />
    </View>
);

interface QuestionType {
    index: string;
    currentIndex: string | undefined;
    text: string;
    children: React.ReactElement;
    toggle: () => void;
    marginTop?: ViewStyle['marginTop'];
}
export const Question = ({
    index,
    currentIndex,
    text,
    children,
    toggle,
    marginTop,
}: QuestionType) => (
    <TouchableOpacity
        style={[styles.questionButton, { marginTop: marginTop || 0 }]}
        onPress={toggle}>
        <QuestionHeader index={index} currentIndex={currentIndex} text={text} />
        {index === currentIndex && children}
        <Separator />
    </TouchableOpacity>
);

export const QuestionText = ({ text }: { text: string; }) => (
    <Text style={[Body.small, styles.questionText]}>{text} </Text>
);

const Separator = () => <View style={styles.separator} />;

interface ContactRowType {
    icon: string;
    title: string;
    text: string;
    onPress: () => void;
}
export const ContactRow = ({ icon, title, text, onPress }: ContactRowType) => (
    <TouchableOpacity style={styles.contactRow} onPress={onPress}>
        <Icon name={icon} size={28} color={Color.primary.royalBlue} />
        <View style={styles.contactRowTextSide}>
            <Text style={[Subtitle[3], styles.contactRowTitle]}>{title}</Text>
            <Text style={[Body.small, styles.contactRowText]}>{text}</Text>
        </View>
    </TouchableOpacity>
);

const currentAppVersion = '1.0';
const brand = DeviceInfo.getBrand();
const model = DeviceInfo.getModel();
const systemName = DeviceInfo.getSystemName();
const osVersion = DeviceInfo.getSystemVersion();

interface SupportTextTypes {
    company: { empresaNomeFantasia: string; empresaCNPJNumber: string; };
    user: { usuarioSystemCode: string; usuarioFirstName: string; };
}
export const supportText = (
    spaceCharacter: string,
    { company, user }: SupportTextTypes,
) =>
    `Olá, preciso de ajuda no K-Vendas2 v${currentAppVersion}${spaceCharacter}${spaceCharacter}Empresa: ${company.empresaNomeFantasia
    }${spaceCharacter}CNPJ: ${CNPJMask(
        company.empresaCNPJNumber,
    )}${spaceCharacter}Vendedor: ${user.usuarioSystemCode} - ${user.usuarioFirstName
    }${spaceCharacter}${spaceCharacter}Aparelho${spaceCharacter}Marca: ${brand}${spaceCharacter}Modelo: ${model}${spaceCharacter}Sistema: ${systemName}${spaceCharacter}Versão OS: ${osVersion}`;

export const ImageContactWrapper = ({ children }: { children: React.ReactNode[]; }) => (
    <View style={styles.contactRowWithImage}>{children}</View>
);

export const BottomSheetHeader = () => (
    <Text style={[Heading.h1, styles.bottomSheetHeader]}>
        Entre em contato
    </Text>
);

export const ContactImage = () => (
    <Image
        source={require('../../assets/app/logo_kasterweb_header-1.png')}
        resizeMethod="resize"
        resizeMode="contain"
        width={140}
        height={80}
        style={styles.image}
    />
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    orderListRowIcon: { alignItems: 'center' },
    orderListRowIcon270: { transform: [{ rotate: '270deg' }] },
    orderListRowIcon90: { transform: [{ rotate: '90deg' }] },
    separator: {
        borderWidth: 1,
        borderColor: Color.neutral.mercury,
        marginVertical: Spacing[20],
    },
    questionButton: { marginHorizontal: Spacing[24], marginTop: Spacing[12] },
    questionHeaderText: { color: Color.neutral.black, flex: 1 },
    headerContainer: { flexDirection: 'row' },
    questionText: {
        marginTop: Spacing[16],
        fontFamily: 'Helvetica',
        color: Color.neutral.boulder,
    },
    contactRow: {
        marginLeft: Spacing[16],
        marginTop: Spacing[20],
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactRowTitle: { color: Color.neutral.boulder },
    contactRowText: { color: Color.neutral.black },
    contactRowTextSide: { marginLeft: Spacing[20] },
    contactRowWithImage: {
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 60,
    },
    bottomSheetHeader: {
        color: Color.neutral.black,
        marginLeft: Spacing[16],
        marginTop: Spacing[12],
    },
    image: { width: 140, height: 90, marginLeft: Spacing[64] },
});
