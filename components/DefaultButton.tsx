import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

export default function DefaultButton({ 
  onPress, 
  title = "Login", 
  style = {}, 
  textStyle = {} 
}: {
  onPress: (event: GestureResponderEvent) => void, 
  title?: string,
  style?: ViewStyle,
  textStyle?: TextStyle
}) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, style]} 
      android_ripple={{ color: "#ffffff50" }}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#007AFF",
    minHeight: 48
  },
  text: {
    fontSize: 16,
    color: "white"
  },
});
