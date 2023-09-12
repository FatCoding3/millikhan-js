import { Field } from "./field";
import { OilDrop } from "./oil-drop";
import { usedConstants } from "./constants";

export class ElectronicField extends Field {

  intensity: number;

  constructor(apply_range: number[], intensity: number) {
    super(apply_range);
    this.intensity = intensity;
  }

  force(oil: OilDrop): number {
    if (!this.checkRange(oil)) return 0;
    return (Math.trunc(oil.electrons) * usedConstants.E_CHARGES) * this.intensity
  }
}