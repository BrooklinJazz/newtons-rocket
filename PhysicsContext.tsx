import React, { useState } from "react";
import { IPhysics } from "./IPhysics";
export const PhysicsContext = React.createContext<IPhysics>({});
export const PhysicsProvider = ({ children }: { children: any }) => {
  const [Force, setForce] = useState(10);
  const [Mass, setMass] = useState(10);
  const [Acceleration, setAcceleration] = useState(Force / Mass);
  const boundValue = (value: number) => Math.min(Math.max(value, 1), 1000);
  const onChangeForce = (value: number) => {
    let boundedValue = boundValue(value)
    setForce(boundedValue);
    setAcceleration(boundedValue / Mass);
  };
  const onChangeAcceleration = (value: number) => {
    let boundedValue = boundValue(value)
    setAcceleration(boundedValue);
    setForce(Mass * boundedValue);
  };
  const onChangeMass = (value: number) => {
    let boundedValue = boundValue(value)
    setMass(boundedValue);
    setAcceleration(Force / boundedValue);
  };
  const [Time, setTime] = useState(0);
  const Velocity = Acceleration * Time;
  const Distance = Velocity * Time;
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);
  const stop = () => {
    setTime(0);
    setStarted(false);
  };
  const incrementTime = () => {
    setTime(Time + 0.1);
  };

  return (
    <PhysicsContext.Provider
      value={{
        Force,
        Mass,
        Acceleration,
        Time,
        Velocity,
        Distance,
        started,
        start,
        stop,
        incrementTime,
        onChangeAcceleration,
        onChangeForce,
        onChangeMass,
      }}
    >
      {children}
    </PhysicsContext.Provider>
  );
};
