import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { Svg, Path, Line, G, Text } from "react-native-svg";
import * as d3 from "d3";

const XAxis = () => {
  return (
    <>
      <Line
        stroke="#000"
        strokeWidth="3"
        x1={0}
        x2={100}
        y1={100}
        y2={100}
      ></Line>
      <Line stroke="black" strokeWidth="1" x1={10} x2={10} y1={100} y2={105} />
      <Text
        fill="#000"
        stroke="#000"
        fontSize="8"
        textAnchor="middle"
        x={10}
        y={120}
      >
        10
      </Text>
    </>
  );
};

const YAxis = () => {
  return (
    <>
      <Line stroke="#000" strokeWidth="3" x1={0} x2={0} y1={0} y2={100}></Line>
      <Line stroke="black" strokeWidth="2" x1={0} x2={-5} y1={90} y2={90} />
      <Text
        fill="#000"
        stroke="#000"
        fontSize="8"
        textAnchor="middle"
        x={-20}
        y={90}
      >
        10
      </Text>
    </>
  );
};

const plotPoints = new Array(100).fill("").map((_, Time) => {
  const Force = 1;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;
  return `L ${Time}, ${100 - Distance}`
})

const Graph = () => {
  useEffect(() => {});
  return (
    <Svg style={{ height: 100, width: 100 }} viewBox="-30 -30 150 150">
      <Path d={`M 0,100 ${plotPoints}`} fill="none" stroke={"black"} />
      <XAxis/>
      <YAxis/>
    </Svg>
  );
};

export default function App() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Graph />
    </View>
  );
}
