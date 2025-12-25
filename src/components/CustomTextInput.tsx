import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, typography } from './styles';

const CustomTextInput = ({ style, ...props }) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor={colors.gray}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    ...typography.body,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: 10,
  },
});

export default CustomTextInput;
