import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

import { Icon } from '../../components';
import { Button, Color, Heading, Spacing, Subtitle } from '../../styles';

export const Container = ({ children }: { children: React.ReactElement[] | Element; }) => (
    <ScrollView style={styles.container}>{children}</ScrollView>
);

export const FormTitle = ({ text }: { text: string; }) => (
    <Text style={[Heading.h1, styles.formTitle]}>{text}</Text>
);

export const FieldTitle = ({ text }: { text: string; }) => (
    <Text style={[Subtitle[2], styles.fieldTitle]}>{text}</Text>
);

export const OpenImageLibrary = ({
    launchImage,
    image,
}: {
    launchImage: () => Promise<ImagePickerResponse>;
    image: Asset[] | undefined;
}) => (
    <TouchableOpacity onPress={launchImage} style={styles.openImageLibrary}>
        {image === undefined && (
            <>
                <Icon
                    name="image"
                    size={24}
                    color={Color.neutral.silver}
                    style={styles.textCentered}
                />
                <Text style={[Subtitle[2], styles.openImageLibraryText]}>
                    Aperte aqui para selecionar a imagem
                </Text>
            </>
        )}
        {image !== undefined && (
            <Image
                source={{ uri: image[0].uri }}
                resizeMethod="resize"
                resizeMode="contain"
                style={styles.image}
            />
        )}
    </TouchableOpacity>
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
    formTitle: { color: Color.neutral.white, marginTop: Spacing[56] },
    navigationContainer: {
        zIndex: 10,
        backgroundColor: '#0000ff',
        width: '100%',
        height: '28%',
    },
    fieldTitle: { color: Color.neutral.white, marginTop: Spacing[40] },
    openImageLibrary: {
        backgroundColor: Color.neutral.white,
        flex: 1,
        height: 92,
        marginTop: Spacing[14],
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textCentered: { textAlign: 'center' },
    openImageLibraryText: {
        textAlign: 'center',
        color: Color.neutral.silver,
    },
    buttonsRow: {
        flexDirection: 'row',
        flex: 1,
        marginTop: Spacing[8],
        marginBottom: Spacing[14],
    },
    cancelButton: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: Spacing[8],
        color: Color.neutral.white,
        paddingHorizontal: Spacing[16],
    },
    image: { width: '100%', height: '100%' },
});
