import { Field } from "./field";
import { OilDrop } from "./oil-drop";
import { usedConstants } from "./constants";

export class GravityField extends Field {
  constructor(apply_range: number[]) {
    super(apply_range)
  }

  force(oil: OilDrop) {
    if (!this.checkRange(oil)) return 0;
    return oil.mass * usedConstants.GRAVITY;
  }
}