import React from 'react';

import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  KeyboardTypeOptions,
  TextInputSubmitEditingEventData,
  View,
  FlexStyle,
} from 'react-native';

import {Body, Color, Spacing} from './../styles';

import {Icon} from './Icon';

interface InputProps {
  input: string;
  setInput: (argument: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number | undefined;
  onBlur?: (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => void | undefined;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData> | undefined,
  ) => void | undefined | Promise<void>;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  marginTop?: FlexStyle['marginTop'];
  marginBottom?: FlexStyle['marginBottom'];
  marginHorizontal?: FlexStyle['marginHorizontal'];
}
const InputPassword = React.forwardRef(
  (
    {
      input,
      setInput,
      placeholder,
      keyboardType,
      onBlur,
      maxLength,
      onSubmitEditing,
      autoCapitalize,
      marginTop,
      marginBottom,
      marginHorizontal,
    }: InputProps,
    ref?: React.LegacyRef<TextInput> | undefined,
  ) => {
    const [visible, setVisible] = React.useState(false);
    const toggleVisible = () => setVisible(!visible);
    return (
      <View
        style={[
          styles.container,
          {
            marginTop: marginTop || 0,
            marginBottom: marginBottom || 0,
            marginHorizontal: marginHorizontal || 0,
          },
        ]}>
        <TextInput
          ref={ref}
          value={input}
          onBlur={onBlur}
          onChangeText={(text: string) => setInput(text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={!visible}
          maxLength={maxLength || undefined}
          placeholderTextColor={Color.neutral.silver}
          onSubmitEditing={onSubmitEditing}
          style={[Body.large, styles.input]}
        />
        {visible && (
          <Icon
            name="eye-outline"
            size={20}
            color={Color.neutral.boulder}
            style={styles.clearIcon}
            onPress={toggleVisible}
          />
        )}
        {visible === false && (
          <Icon
            name="eye-off-outline"
            size={20}
            color={Color.neutral.boulder}
            style={styles.clearIcon}
            onPress={toggleVisible}
          />
        )}
      </View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: Color.neutral.white,
    borderRadius: 8,
    paddingLeft: Spacing[16],
    paddingRight: Spacing[12],
    paddingVertical: 15,
    maxHeight: 54,
    minHeight: 54,
    alignItems: 'center',
  },
  input: {
    height: 54,
    flex: 1,
    color: Color.neutral.black,
  },
  clearIcon: {alignSelf: 'center'},
});

export {InputPassword};
