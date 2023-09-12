export class OilDrop {
  readonly DENSITY = 700;
  readonly VELOCITY_STOP_CONDITION = 1e-7

  id: number;
  velocity: number = 0
  electrons: number = 0;
  terminal_velocities: number[] = []
  terminated = false
  radius: number;
  height: number;
  volume: number;
  mass: number;

  constructor(id: number, radius: number, init_height: number) {
    this.id = id;
    this.radius = radius;
    this.height = init_height;
    this.volume = (4/3)*Math.PI*radius**3;
    this.mass = this.volume * this.DENSITY
  }

  stopCondition(acceleration: number) {
    return Math.abs(acceleration) < this.VELOCITY_STOP_CONDITION && !this.terminated;
  }

  applyForce(force: number, time: number) {
    const acceleration = force/this.mass;

    if (this.stopCondition(acceleration)) {
      this.terminal_velocities.push(this.velocity);
      this.terminated = true;
      console.log(this.id, this.radius, this.height, this.terminal_velocities);
    }
    // console.log(this.id, this.radius, this.height, this.velocity, this.terminal_velocities, this.terminated);
    this.height += this.velocity * time;
    this.velocity += acceleration * time;
  }
}