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

import { Color, Spacing, Subtitle } from './../styles';

import { Icon } from './Icon';

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
  leftIcon?: boolean;
  editable?: boolean;
  clearIcon?: boolean;
  marginTop?: FlexStyle['marginTop'];
  marginBottom?: FlexStyle['marginBottom'];
  marginHorizontal?: FlexStyle['marginHorizontal'];
  clearFn?: () => void;
}
const InputWithIconAndClear = React.forwardRef(
  (
    {
      input,
      setInput,
      placeholder,
      editable,
      keyboardType,
      onBlur,
      maxLength,
      onSubmitEditing,
      autoCapitalize,
      secureTextEntry,
      leftIcon,
      clearIcon,
      marginTop,
      marginBottom,
      marginHorizontal,
      clearFn,
    }: InputProps,
    ref?: React.LegacyRef<TextInput> | undefined,
  ) => (
    <View
      style={[
        styles.container,
        {
          marginTop: marginTop || 0,
          marginBottom: marginBottom || 0,
          marginHorizontal: marginHorizontal || 0,
        },
      ]}>
      {leftIcon && (
        <Icon
          name="magnifying-glass"
          color={Color.primary.royalBlue}
          size={18}
          style={styles.leftIcon}
        />
      )}
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
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        style={[Subtitle[2], styles.input]}
      />
      {clearIcon && (
        <Icon
          name="x"
          size={18}
          color={Color.neutral.mercury}
          style={styles.clearIcon}
          onPress={clearFn}
        />
      )}
    </View>
  ),
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.neutral.wildSand,
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
  leftIcon: { alignSelf: 'center', marginRight: 12 },
  clearIcon: { alignSelf: 'center' },
});

export { InputWithIconAndClear };
