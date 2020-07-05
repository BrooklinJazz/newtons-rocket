
export interface IPhysics {
  Acceleration: number;
  Force: number;
  Mass: number;
  Time: number;
  Distance: number;
  Velocity: number;
  // Because I don't yet know how to extend a type using Pick,
  // I'm putting stared on these type - though it doesn't belong here.
  started: boolean;
}
