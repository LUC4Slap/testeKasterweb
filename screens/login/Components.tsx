import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, Keyboard, Alert } from 'react-native';

import { BasicButton, BottomSheetPureReact, InputErrorText, InputWithIconAndClear, LoadingModal } from '../../components';
import { forgotPasswordRequest } from '../../frameworks/web/axios/ForgotPassword.routes';
import { Button, Color, Heading, Spacing, Subtitle } from '../../styles';
import { RunTimeForm } from '../../utils/formData';
import { isEmailValid } from '../../utils/helpers';

const dimension = Dimensions.get('screen');

export const Container = ({ children }: { children: React.ReactElement[] | Element; }) => (
    <ScrollView style={styles.container}>{children}</ScrollView>
);

export const FieldTitle = ({ text }: { text: string; }) => (
    <Text style={[Subtitle[2], styles.fieldTitle]}>{text}</Text>
);

export const RegisterUser = ({
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

export const ForgotPasswordBottomSheet = ({
    isVisible,
    onClose,
}: {
    isVisible: boolean;
    onClose: () => void;
}) => {
    const [input, setInput] = React.useState('');
    const clearFn = () => setInput('');

    const [lengthError, setLengthError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const [loading, setLoading] = useState(false);
    const doRequest = (email: string) => {
        setLoading(true);
        const formData = new RunTimeForm<{ email: string; }>().formData({ email });
        forgotPasswordRequest(formData)
            .then(res => console.log('response from api: ', res.data))
            .catch(err => Alert.alert('Aviso', err.response.data.message || 'Falha na requisição. Contate o suporte.'))
            .finally(() => {
                setInput('');
                onClose();
                Keyboard.dismiss();
                setLoading(false);
            });
    };

    const handleValidation = () => {
        if (input.length === 0) {
            setLengthError(true);
            setEmailError(false);
        } else if (isEmailValid(input) === false) {
            setEmailError(true);
            setLengthError(false);
        } else {
            setLengthError(false);
            setEmailError(false);
            console.debug('request triggered');
            doRequest(input);
        }
    };

    return (
        <>
            <LoadingModal state={loading} />
            <BottomSheetPureReact
                height={dimension.height * 0.35}
                isVisible={isVisible}
                onClose={onClose}>
                <Text style={[Heading.h1, { color: Color.neutral.black }]}>
                    Recuperar Senha
                </Text>
                <Text style={[Subtitle[3], styles.modalSubtitle]}>
                    Digite seu e-mail abaixo para receber o link de recuperação
                </Text>
                <InputWithIconAndClear
                    input={input}
                    clearIcon={input.length > 0 ? true : false}
                    placeholder="Seu E-mail"
                    clearFn={clearFn}
                    setInput={text => setInput(text)}
                    onSubmitEditing={handleValidation}
                    marginTop={Spacing[16]}
                    marginBottom={Spacing[8]}
                />
                {lengthError && (
                    <InputErrorText
                        text="Campo obrigatório."
                        textColor={Color.semantic.froly}
                    />
                )}
                {emailError && (
                    <InputErrorText
                        text="E-mail inválido."
                        textColor={Color.semantic.froly}
                    />
                )}
                <BasicButton
                    text="Solicitar"
                    onPress={handleValidation}
                    marginTop={Spacing[8]}
                    colorButton={Color.primary.royalBlue}
                    colorText={Color.primary.riptide}
                />
            </BottomSheetPureReact>
        </>
    );
};

const styles = StyleSheet.create({
    fieldTitle: { color: Color.neutral.white, marginTop: Spacing[40] },
    container: {
        backgroundColor: Color.primary.royalBlue,
        flex: 1,
        paddingHorizontal: Spacing[16],
    },
    trialText: {
        color: Color.primary.riptide,
        marginTop: `${dimension.height * 0.026}%`,
        marginBottom: Spacing[20],
        textAlign: 'center',
    },
    modalSubtitle: { color: Color.neutral.boulder, marginTop: Spacing[8] },
});
