import { VisitorModel } from "../databases/models/visitors";

export class VisitorRepository {
  async create(device: any) {
    return await VisitorModel.query().insert(device).returning("*");
  }

  async show(payload: any) {
    return await VisitorModel.query().findOne(payload);
  }

  async update(visitorId: number, payload: any) {
    return await VisitorModel.query()
      .update(payload)
      .where({ id: visitorId })
      .returning("*");
  }

  async list() {
    return await VisitorModel.query().select("*").orderBy("id", "desc");
  }

  async delete(visitorId: number) {
    return await VisitorModel.query().deleteById(visitorId);
  }
}
