import React from 'react';

import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  KeyboardTypeOptions,
  TextInputSubmitEditingEventData,
} from 'react-native';

import {Color, Spacing, Body} from './../styles';

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
  secureTextEntry?: TextInputProps['secureTextEntry'];
}
const BasicInput = React.forwardRef(
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
      secureTextEntry,
    }: InputProps,
    ref?: React.LegacyRef<TextInput> | undefined,
  ) => (
    <TextInput
      ref={ref}
      value={input}
      onBlur={onBlur}
      onChangeText={(text: string) => setInput(text)}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength || undefined}
      placeholderTextColor={Color.neutral.silver}
      onSubmitEditing={onSubmitEditing}
      style={[Body.large, styles.input]}
    />
  ),
);
const styles = StyleSheet.create({
  input: {
    backgroundColor: Color.neutral.white,
    paddingVertical: 15,
    paddingHorizontal: Spacing[16],
    borderRadius: 8,
    marginTop: Spacing[14],
    color: Color.neutral.black,
  },
});

export {BasicInput};
