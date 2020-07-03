import useInterval from "@use-it/interval";
import React, { useState, useEffect } from "react";
import { Button, Text, View, TouchableOpacity, Alert } from "react-native";
import { Graph } from "./Graph";
import { Rocket } from "./Rocket";
import styled from "styled-components/native";

const LaunchTouchable = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const LaunchText = styled.Text.attrs(() => ({
  children: "LAUNCH",
}))``;

const LaunchButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <LaunchTouchable onPress={onPress}>
      <LaunchText />
    </LaunchTouchable>
  );
};

// TODO use this constant everywhere
const maxY = 100;

export default function App() {
  const Force = 1;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const [Time, setTime] = useState(0);
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);
  useEffect(() => {
    if (Distance >= maxY) {
      Alert.alert("Huston we have liftoff!!!", undefined, [
        {
          text: "Roger! Lets do it again",
          onPress: () => {
            setStarted(false);
            setTime(0);
          },
        },
      ]);
    }
  }, [Distance]);
  useInterval(
    () => {
      setTime(Time + 1);
    },
    Distance === 100 || !started ? null : 100
  );
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          borderBottomColor: "black",
          flexDirection: "row",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <Graph Time={Time} Distance={Distance} Acceleration={Acceleration} />
        <View
          style={{
            flex: 1,
            backgroundColor: "pink",
            height: "100%",
            width: "100%",
          }}
        >
          <Text>This will be an equation list</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Rocket Distance={Distance} />
      </View>
      <LaunchButton onPress={start} />
    </View>
  );
}
