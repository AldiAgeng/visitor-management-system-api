import { Model, ModelObject } from "objection";

export class VisitorModel extends Model {
  id!: number;
  idcard_num!: string | null;
  name!: string | null;
  type!: string | null;
  img_base64!: string | null;
  md5!: string | null;
  passtime!: string | null;
  group_id!: string | null;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "visitors";
  }

  static get relationMappings() {
    return {
      visitor_records: {
        relation: Model.HasManyRelation,
        modelClass: "VisitorRecordModel",
        join: {
          from: "visitors.idcard_num",
          to: "visitor_records.idcard_num",
        },
      },
    };
  }
}

export type Visitors = ModelObject<VisitorModel>;
