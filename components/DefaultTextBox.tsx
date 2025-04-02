import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function DefaultTextBox({ 
  onChangeText, 
  textValue,
  placeholder="",
  secureTextEntry=false,
  style = {}
}:{
  onChangeText:((text: string) => void) | undefined, 
  textValue: string | undefined,
  placeholder?: string | undefined,
  secureTextEntry: boolean,
  style?: TextInputProps["style"]
}) {
  return (
    <TextInput
        style={[styles.textInput, style]}
        onChangeText={onChangeText}
        value={textValue}
        placeholder={placeholder}
        keyboardType="default"
        secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6
  },
});
