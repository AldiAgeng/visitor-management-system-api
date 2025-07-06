import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: number;
  name!: string;
  username!: string;
  password!: string;
  role!: string;
  token!: string;
  refresh_token!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }
}

export type Users = ModelObject<UsersModel>;
