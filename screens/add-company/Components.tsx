import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from "../../components";
import { Button, Color, Heading, Spacing, Subtitle, UnorderedList } from "../../styles";
import { CNPJMask } from "../../utils/helpers";

export const Container = ({
    children,
}: {
    children: React.ReactElement[] | React.ReactElement | false | Element;
}) => <View style={styles.container}>{children}</View>;

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

export const FillBlank = () => <View style={styles.fillBlank}>
    <Text style={[styles.fillBlankText]}>Nenhuma empresa cadastrada até o momento. Entre em contato com o administrador.</Text>
</View>;

export const ModalContainer = ({ visible, onPress, children }: { visible: boolean; children: React.ReactElement[]; onPress: () => void; }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={[styles.modalOuterFrame]}>
                <View style={[styles.modalInnerFrame]}>
                    <Text onPress={onPress} style={[Heading.h3, styles.modalText, styles.closeButton]}>x</Text>
                    <Text style={[Heading.h3, styles.modalText]}>Código do vendedor no sistema</Text>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.neutral.white },
    headerText: { flex: 1, color: Color.neutral.black },
    header: {
        flexDirection: 'row',
        marginHorizontal: Spacing[16],
        marginTop: Spacing[24],
        alignItems: 'center',
    },
    icon: { padding: Spacing[4] },
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
    fillBlank: { flex: 1, justifyContent: 'center', marginHorizontal: Spacing[16] },
    fillBlankText: { textAlign: 'center', textAlignVertical: 'center' },
    modalText: { fontWeight: 'bold', marginBottom: Spacing[16], marginHorizontal: Spacing[16] },
    modalOuterFrame: { flex: 1, backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center' },
    modalInnerFrame: { backgroundColor: 'white', justifyContent: 'center', height: height * .26, borderRadius: 8, marginHorizontal: Spacing[16] },
    closeButton: { textAlign: 'right', marginHorizontal: 0, marginRight: 16 }
});