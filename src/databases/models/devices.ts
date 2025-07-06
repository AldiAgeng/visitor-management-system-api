import { Model, ModelObject } from "objection";

export class DevicesModel extends Model {
  id!: number;
  device_key!: string | null;
  group_id!: string | null;
  name!: string | null;
  status!: string | null;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "devices";
  }
}

export type Devices = ModelObject<DevicesModel>;
