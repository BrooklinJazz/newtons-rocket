
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
}
