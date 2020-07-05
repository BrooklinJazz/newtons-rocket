import React, { useContext } from "react";
import { Svg, Path, Line, Text, Circle } from "react-native-svg";
import { MaximumDistance } from "./MaximumDistance";
import { IPhysics } from "./IPhysics";
import { PhysicsContext } from "./PhysicsContext";

export const Graph = () => {
  const {Time, Distance, Acceleration} = useContext(PhysicsContext)
  return (
    <Svg style={{ height: 200, width: 200 }} viewBox="-30 -30 150 150">
      <Circle cx={Time} cy={100 - Distance} r="5" fill={"red"} />
      <Path
        d={`M 0,100 ${plotPoints(Acceleration)}`}
        fill="none"
        stroke={"black"}
      />
      <XAxis step={20} />
      <YAxis step={20} />
    </Svg>
  );
};


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
        //   Adding key breaks render
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
          <YTick key={"YTick-" + step} step={step} maxY={maxY} />
          <Label key={"YLabel-" + step} x={-20} y={maxY - step}>
            {`${step}${unit}`}
          </Label>
        </>
      ))}
    </>
  );
};
const plotPoints = (Acceleration: number) => {
  let hitMaximumDistance = false
  return new Array(100)
    .fill("")
    .map((_, Time) => {
      const Velocity = Acceleration * Time;
      const Distance = Velocity * Time;
      // Draw last point after hitting the max distance
      if (hitMaximumDistance) {
        return
      }
      if (Distance >= MaximumDistance) {
        hitMaximumDistance = true
      }
      return `L ${Time}, ${100 - Distance}`;
    })
    .filter(each=> each)
    .join("");
}