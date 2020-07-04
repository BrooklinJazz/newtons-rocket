import React from "react";
import { Text, View } from "react-native";
import { IPhysics } from "./App";

export const Equations = ({
  Acceleration,
  Mass,
  Force,
  Velocity,
  Time,
  Distance
}: Pick<IPhysics, "Acceleration" | "Mass" | "Force" | "Velocity" | "Time" | "Distance">) => {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <Text>F = M * A</Text>
      <Text>
        {Force.toFixed(2)} = {Mass.toFixed(2)} * {Acceleration.toFixed(2)}
      </Text>
      <Text>V = T * A </Text>
      <Text>
        {Velocity.toFixed(2)} = {Time.toFixed(2)} * {Acceleration.toFixed(2)}
      </Text>
      <Text>D = ∆T * ∆V</Text>
      <Text>
        {Distance.toFixed(2)} = {Time.toFixed(2)} * {Velocity.toFixed(2)}
      </Text>
    </View>
  );
};
