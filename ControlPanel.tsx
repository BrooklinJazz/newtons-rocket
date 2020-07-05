import React, { useEffect, useContext, useRef } from "react";
import { View, Animated, Keyboard, TextInput } from "react-native";
import { BaseText } from "./Equations";
import { PhysicsContext } from "./PhysicsContext";
import { background, foreground } from "./Colors";
import styled from "styled-components/native";
const Input = styled.TextInput`
  color: ${foreground};
  font-size: 20px;
  background-color: ${background};
`;
const PhysicsInput = ({
  setter,
  value,
  label,
}: {
  setter: (value: number) => void;
  value: number;
  label: string;
}) => {
  const inputRef = useRef<TextInput | null>(null);
  return (
    <View>
      <BaseText
        onPress={() => inputRef?.current?.focus()}
        style={{ backgroundColor: "red" }}
      >
        {label}
      </BaseText>
      <Input
        ref={inputRef}
        onChangeText={(text) => {
          setter(parseFloat(text) || value);
        }}
        onBlur={(e) => {
          setter(parseFloat(e.nativeEvent.text) || value);
        }}
        keyboardType="numeric"
        returnKeyType={"done"}
        placeholder={value.toFixed(2)}
        placeholderTextColor={foreground}
      />
    </View>
  );
};
export const ControlPanel = () => {
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // 200 duration is somewhat a magic number that seemed to work nicely with
  // the default keyboard opening speed
  const startAnimation = (toValue: number) =>
    Animated.timing(keyboardOffset, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    // start the animation when the keyboard appears
    Keyboard.addListener("keyboardWillShow", (e) => {
      // use the height of the keyboard (negative because the translateY moves upward)
      startAnimation(e.endCoordinates?.height);
    });
    // perform the reverse animation back to keyboardOffset initial value: 0
    Keyboard.addListener("keyboardWillHide", () => {
      startAnimation(0);
    });
    return () => {
      // remove listeners to avoid memory leak
      Keyboard.removeAllListeners("keyboardWillShow");
      Keyboard.removeAllListeners("keyboardWillHide");
    };
  }, []);

  const {
    Force,
    onChangeForce,
    onChangeMass,
    Mass,
    onChangeAcceleration,
    Acceleration,
  } = useContext(PhysicsContext);
  return (
    <Animated.View
      style={{
        position: "absolute",
        justifyContent: "space-evenly",
        width: 100,
        height: 200,
        bottom: keyboardOffset,
      }}
    >
      <PhysicsInput setter={onChangeForce} value={Force} label="Force" />
      <PhysicsInput setter={onChangeMass} value={Mass} label="Mass" />
      <PhysicsInput
        setter={onChangeAcceleration}
        value={Acceleration}
        label="Acceleration"
      />
    </Animated.View>
  );
};
