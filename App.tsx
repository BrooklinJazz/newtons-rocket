import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { G } from "react-native-svg";
import * as d3 from "d3";
import useInterval from "@use-it/interval";
import { Graph } from "./Graph";

export default function App() {
  const Force = 1;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const [Time, setTime] = useState(0);
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;

  useInterval(
    () => {
      setTime(Time + 1);
    },
    Distance === 100 ? null : 100
  );
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Graph Time={Time} Distance={Distance} Acceleration={Acceleration} />
    </View>
  );
}
