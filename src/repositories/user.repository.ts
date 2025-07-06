import { UsersModel } from "../databases/models/users";

export class UserRepository {
  async create(user: any) {
    return await UsersModel.query().insert(user).returning("*");
  }

  async show(payload: any) {
    return await UsersModel.query().findOne(payload);
  }

  async update(userId: number, payload: any) {
    return await UsersModel.query().update(payload).where({ id: userId });
  }

  async list() {
    return await UsersModel.query().select(['id', 'name', 'username', 'role', 'created_at', 'updated_at']).orderBy("id", "desc");
  }

  async delete(userId: number) {
    return await UsersModel.query().deleteById(userId);
  }
}