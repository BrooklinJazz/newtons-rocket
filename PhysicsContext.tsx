import React, { useState } from "react";
import { IPhysics } from "./IPhysics";
export const PhysicsContext = React.createContext<IPhysics>({});
export const PhysicsProvider = ({ children }: { children: any; }) => {
  const [Force, setForce] = useState(10)
  const [Mass, setMass] = useState(100);
  const [Acceleration, setAcceleration] = useState(Force / Mass);
  const onChangeForce = (value: number) => {
    setForce(value)
    setAcceleration(value / Mass)
  }
  const onChangeAcceleration = (value: number) => {
    setAcceleration(value)
    setForce(Mass * value)
  }
  const onChangeMass = (value: number) => {
    setMass(value)
    setAcceleration(Force / value)
  }
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
