import { OilDrop } from "./oil-drop";

export class ElectronShooter {

  wattage: number;
  radius: number;
  height: number;

  constructor(wattage: number, radius: number, height: number) {
    this.wattage = wattage;
    this.radius = radius;
    this.height = height;
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