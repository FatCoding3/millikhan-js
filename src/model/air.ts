import { Field } from "./field";
import { OilDrop } from "./oil-drop";
import { usedConstants } from "./constants";

export class Air extends Field {
  readonly DENSITY = 1.293;
  readonly VISCOSITY = 1.849e-5;

  constructor(apply_range: number[]) {
    super(apply_range);
  }

  force(oil: OilDrop): number {
    if (!this.checkRange(oil)) return 0;
    return this.getArchimedesForce(oil) + this.getDragForce(oil);
  }

  getArchimedesForce(oil: OilDrop) {
    return - oil.volume * this.DENSITY * usedConstants.GRAVITY;
  }

  getDragForce(oil: OilDrop) {
    return -6 * Math.PI * this.VISCOSITY * oil.radius * oil.velocity;
  }
}