import React, { useState, useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { Svg, Path, Line, G, Text } from "react-native-svg";
import * as d3 from "d3";

const Label = ({ ...props }) => (
  <Text
    fill={"black"}
    stroke={"black"}
    fontSize={"8"}
    textAnchor={"middle"}
    strokeWidth={0.2}
    {...props}
  />
);

const Tick = ({ ...props }) => (
  <Line stroke={"black"} strokeWidth={1} {...props} />
);

const XTick = ({ step, maxY }: { step: number; maxY: number }) => (
  <Tick x1={step} x2={step} y1={maxY} y2={maxY + 5} />
);

const YTick = ({ step, maxY }: { step: number; maxY: number }) => (
  <Tick x1={0} x2={-5} y1={maxY - step} y2={maxY - step} />
);

const Bar = ({ ...props }) => <Line stroke="#000" strokeWidth="1" {...props} />;

const HorizontalBar = ({
  minX,
  maxY,
  maxX,
}: {
  minX: number;
  maxY: number;
  maxX: number;
}) => <Bar x1={minX} x2={maxX} y1={maxY} y2={maxY} />;

const VerticalBar = ({
  minX,
  maxY,
  minY,
}: {
  minX: number;
  maxY: number;
  minY: number;
}) => <Bar x1={minX} x2={minX} y1={minY} y2={maxY} />;

const XAxis = ({ step = 10, minX = 0, maxX = 100, maxY = 100, unit = "s" }) => {
  const steps = new Array(Math.floor(maxX / step))
    .fill("")
    .map((_, i) => i * step);
  return (
    <>
      <HorizontalBar minX={minX} maxX={maxX} maxY={maxY} />
      {steps.map((step) => (
        <>
          <XTick step={step} maxY={maxY} />
          <Label x={step} y={maxY + 20}>
            {`${step}${unit}`}
          </Label>
        </>
      ))}
    </>
  );
};

const YAxis = ({ step = 10, minY = 0, minX = 0, maxY = 100, unit = "m" }) => {
  const steps = new Array(Math.floor(maxY / step))
    .fill("")
    .map((_, i) => i * step);
  return (
    <>
      <VerticalBar maxY={maxY} minX={minX} minY={minY} />
      {steps.map((step) => (
        <>
          <YTick step={step} maxY={maxY} />
          <Label x={-20} y={maxY - step}>
            {`${step}${unit}`}
          </Label>
        </>
      ))}
    </>
  );
};

const plotPoints = new Array(100).fill("").map((_, Time) => {
  const Force = 1;
  const Mass = 100;
  const Acceleration = Force / Mass;
  const Speed = Acceleration * Time;
  const Distance = Speed * Time;
  return `L ${Time}, ${100 - Distance}`;
});

const Graph = () => {
  useEffect(() => {});
  return (
    <Svg style={{ height: 200, width: 200 }} viewBox="-30 -30 150 150">
      <Path d={`M 0,100 ${plotPoints}`} fill="none" stroke={"black"} />
      <XAxis step={20} />
      <YAxis step={20} />
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
