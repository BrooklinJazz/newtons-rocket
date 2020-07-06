import React, { useEffect, useContext, useRef } from "react";
import { Animated, Keyboard, Platform } from "react-native";
import { PhysicsContext } from "./PhysicsContext";
import { PhysicsInput } from "./Input";
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
