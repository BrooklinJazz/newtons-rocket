import React, { useEffect, useContext, useRef, useState } from "react";
import { View, Animated, Keyboard, TextInput, Platform } from "react-native";
import { BaseText } from "./Equations";
import { PhysicsContext } from "./PhysicsContext";
import { background, foreground, primary } from "./Colors";
import styled from "styled-components/native";
const Input = styled.TextInput`
  color: ${foreground};
  font-size: 20px;
  background-color: ${background};
  text-align: right;
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
  const [tempValue, setTempValue] = useState(value.toString());
  useEffect(() => {
    setTempValue(value.toString());
  }, [value]);
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
          setTempValue("")
        }}
        onEndEditing={(e) => {
          const text = e.nativeEvent.text;
          const containsLetters = text.split("").some((each) => isNaN(each));
          if (text === "") {
            setTempValue(value.toString())
          } else if (!containsLetters) {
            setter(parseFloat(text));
          }

        }}
        keyboardType="numeric"
        returnKeyType={"done"}
        value={tempValue}
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
    // Android is not responding to willShow/willHide events
    // but does respond to didShow/didHide
    const setKeyboardEvent = Platform.select({
      android: () => {
        Keyboard.addListener("keyboardDidShow", (e) => {
          startAnimation(e.endCoordinates?.height);
        });
        Keyboard.addListener("keyboardDidHide", (e) => {
          startAnimation(0);
        });
      },
      ios: () => {
        Keyboard.addListener("keyboardWillShow", (e) => {
          startAnimation(e.endCoordinates?.height);
        });
        Keyboard.addListener("keyboardWillHide", () => {
          startAnimation(0);
        });
      },
    });
    setKeyboardEvent && setKeyboardEvent();
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
        width: 130,
        height: 200,
        bottom: keyboardOffset,
      }}
    >
      <PhysicsInput setter={onChangeForce} value={Force} label="Force (N)" />
      <PhysicsInput setter={onChangeMass} value={Mass} label="Mass (KG)" />
      <PhysicsInput
        setter={onChangeAcceleration}
        value={Acceleration}
        label="Acceleration (m/s²)"
      />
    </Animated.View>
  );
};
