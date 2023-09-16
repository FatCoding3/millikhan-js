import { OilDrop } from "./oil-drop";

export interface ElectronShooterInitData {
  wattage?: number;
  radius?: number;
  height?: number
}

export class ElectronShooter {

  wattage: number;
  radius: number;
  height: number;

  constructor(props: ElectronShooterInitData) {
    this.wattage = props.wattage ?? 0;
    this.radius = props.radius ?? 0;
    this.height = props.height ?? 0;
  }

  checkRange(oil: OilDrop) {
    if (oil.height < this.height - this.radius) return false;
    if (oil.height > this.height + this.radius) return false;
    return true;
  }

  charge(oil: OilDrop, time_diff: number) {
    if (!this.checkRange(oil)) return;
    oil.electrons += ((oil.radius/this.radius)**2) * this.wattage * time_diff;
    return oil;
  }
}