import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import useInterval from "@use-it/interval";

const Rocket = styled.View`
  background-color: red;
  height: 20px;
  width: 10px;
`;

export default function App() {
  const Force = 10;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const [Time, setTime] = useState(0);
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;
  const { height } = useWindowDimensions();
  useInterval(() => {
    setTime(Time + (0.01));
  }, 10);
  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        bottom: Distance % height,
        position: "absolute",
      }}
    >
      <Rocket style={{ position: "absolute", bottom: Distance}} />
    </View>
  );
}
