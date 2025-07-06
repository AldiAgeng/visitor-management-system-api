import { VisitorModel } from './visitors';
import { Model, ModelObject } from "objection";

export class VisitorRecordModel extends Model {
  id!: number;
  group_id!: string | null;
  device_key!: string | null;
  idcard_num!: string | null;
  record_id!: string | null;
  img_base64!: string | null;
  time!: string | null;
  type!: string | null;
  extra!: string | null;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "visitor_records";
  }

  static get relationMappings() {
    return {
      device: {
        relation: Model.BelongsToOneRelation,
        modelClass: "DevicesModel",
        join: {
          from: "visitor_records.device_key",
          to: "devices.device_key",
        },
      },
      visitor: {
        relation: Model.BelongsToOneRelation,
        modelClass: VisitorModel,
        join: {
          from: "visitor_records.idcard_num",
          to: "visitors.idcard_num",
        },
      },
    };
  }
}

export type VisitorRecord = ModelObject<VisitorRecordModel>;
