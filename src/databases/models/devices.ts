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

  static get relationMappings() {
    return {
      visitors: {
        relation: Model.HasManyRelation,
        modelClass: "VisitorModel",
        join: {
          from: "devices.id",
          to: "visitors.device_id",
        },
      },
    };
  }
}

export type Devices = ModelObject<DevicesModel>;
