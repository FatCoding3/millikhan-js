import { Air } from "./air";
import { ElectronShooter } from "./electron-shooter";
import { ElectronicField } from "./electronic-field";
import { Field } from "./field";
import { GravityField } from "./gravity-field";
import { OilDrop, VelocitiesDataItem } from "./oil-drop";

export interface MachineInitialData {
  total_height: number;
  electronic_height: number;
  electronic_voltage: number;
  electron_shooter?: ElectronShooter;
  oil_radius_level: number;
}

export class Machine {
  readonly OIL_MIN_RADIUS = 2e-5;

  existing_oils: {[key: number]: OilDrop} = {};
  destroyed_oils: {[key: number]: OilDrop} = {};

  fields: Field[];
  electron_shooter: ElectronShooter;

  next_id = 0;
  total_height: number;
  electronic_height: number;
  oil_radius_level: number;

  constructor(initData: MachineInitialData) {
    this.total_height = initData.total_height;
    this.electronic_height = initData.electronic_height;
    this.electron_shooter = initData.electron_shooter ?? new ElectronShooter({});
    this.oil_radius_level = initData.oil_radius_level;

    this.fields = [
      new ElectronicField([0, initData.electronic_height], initData.electronic_voltage/initData.electronic_height),
      new GravityField([0, initData.total_height]),
      new Air([0, initData.total_height])
    ]
  }

  generateOil() {
    const random_radius = this.OIL_MIN_RADIUS * this.oil_radius_level + Math.random()* (this.OIL_MIN_RADIUS);

    const new_oil = new OilDrop(this.next_id, random_radius, this.total_height);

    this.existing_oils[this.next_id] = new_oil;
    this.next_id += 1;

    return this.next_id - 1;
  }

  checkOilDestroyed() {
    for (const key of Object.keys(this.existing_oils)) {
      const id = parseInt(key);
      const oil = this.existing_oils[id];

      if (oil.height <= 0) {
        this.destroyed_oils[id] = oil;
        delete this.existing_oils[id];
      }
    }
  }

  checkOilTerminalAgain(fromHeight: number) {
    for (const key of Object.keys(this.existing_oils)) {
      const id = parseInt(key);
      const oil = this.existing_oils[id];

      if (oil.height < fromHeight && oil.terminal_velocities.length === 1)
        this.existing_oils[id].terminated = false;
        // console.log('again ' + key );
    }
  }

  fieldsForce(oil: OilDrop) {
    let total_force = 0;
    for (const field of this.fields) {
      total_force += field.force(oil);
    }
    return total_force;
  }

  oilMovementEvolution(time_diff: number) {
    const velocitiesData: VelocitiesDataItem[] = [];
    for (const key of Object.keys(this.existing_oils)) {
      const id = parseInt(key);
      const oil = this.existing_oils[id];

      const velocitiesDataItem = this.existing_oils[id].applyForce(
        this.fieldsForce(oil),
        time_diff
      );

      if (velocitiesDataItem) velocitiesData.push(velocitiesDataItem);
    }
    return velocitiesData;
  }

  chargesEvolution(time_diff: number) {
    if (!this.electron_shooter) return;
    for (const key of Object.keys(this.existing_oils)) {
      const id = parseInt(key);
      this.electron_shooter.charge(
        this.existing_oils[id],
        time_diff
      )
    }
  }

  timeEvolution(time_diff: number) {
    this.checkOilDestroyed();
    this.chargesEvolution(time_diff);
    this.checkOilTerminalAgain(this.electronic_height);
    return this.oilMovementEvolution(time_diff)
  }
}