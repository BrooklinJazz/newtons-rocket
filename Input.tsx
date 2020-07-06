import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, Platform } from "react-native";
import { BaseText } from "./Equations";
import { background, foreground, primary } from "./Colors";
import styled from "styled-components/native";
const Input = styled.TextInput`
  color: ${foreground};
  font-size: 20px;
  background-color: ${background};
  text-align: right;
`;
export const PhysicsInput = ({
  setter,
  value,
  label, }: {
    setter: (value: number) => void;
    value: number;
    label: string;
  }) => {
  const inputRef = useRef<TextInput | null>(null);
  const [tempValue, setTempValue] = useState(value.toString());
  useEffect(() => {
    setTempValue(value.toString());
  }, [value]);
  const handleInputSubmission = (text: string) => {
    text;
    const containsLetters = text.split("").some((each) => isNaN(each));
    if (text === "") {
      setTempValue(value.toString());
    }
    else if (!containsLetters) {
      setter(parseFloat(text));
    }
  };
  return (
    <View>
      <BaseText
        onPress={() => inputRef?.current?.focus()}
        style={{ backgroundColor: primary }}
      >
        {label}
      </BaseText>
      <Input
        ref={inputRef}
        onChangeText={(text) => {
          const containsLetters = text.split("").some((each) => isNaN(each));
          if (!containsLetters) {
            setTempValue(text);
          }
        }}
        onFocus={() => {
          setTempValue("");
        }}
        // onBlur does not trigger on mobile
        // but does for web
        onBlur={(e) => {
          if (Platform.OS === "web") {
            handleInputSubmission(e.currentTarget.value);
          }
        }}
        // onEndEditing triggers for mobile
        // but not for web
        onEndEditing={(e) => handleInputSubmission(e.nativeEvent.text)}
        keyboardType="numeric"
        returnKeyType={"done"}
        value={tempValue}
        placeholderTextColor={foreground} />
    </View>
  );
};
