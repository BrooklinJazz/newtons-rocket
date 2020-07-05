
export interface IPhysics {
  Acceleration: number;
  Force: number;
  Mass: number;
  Time: number;
  Distance: number;
  Velocity: number;
  started: boolean;
  start: () => void;
  stop: () => void;
  incrementTime: () => void;
  onChangeForce: (value: number) => void;
  onChangeMass: (value: number) => void;
  onChangeAcceleration: (value: number) => void;
}
