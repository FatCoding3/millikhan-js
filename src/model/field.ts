import { OilDrop } from "./oil-drop";

export abstract class Field {
  apply_range: number[];

  constructor(apply_range: number[]) {
    if (apply_range.length !== 2)
      throw new Error('Ranges must have 2 args');
    this.apply_range = apply_range;
  }

  checkRange(oil: OilDrop) {
    if (oil.height < this.apply_range[0]) return false;
    if (oil.height > this.apply_range[1]) return false;
    return true;
  }

  abstract force(oil: OilDrop): number;
}