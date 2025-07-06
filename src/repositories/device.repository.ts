import { DevicesModel } from "../databases/models/devices";

export class DeviceRepository {
  async create(device: any) {
    return await DevicesModel.query().insert(device).returning("*");
  }

  async show(payload: any) {
    return await DevicesModel.query().findOne(payload);
  }

  async update(deviceId: number, payload: any) {
    return await DevicesModel.query()
      .update(payload)
      .where({ id: deviceId })
      .returning("*");
  }

  async list() {
    return await DevicesModel.query().select("*").orderBy("id", "desc");
  }

  async delete(deviceId: number) {
    return await DevicesModel.query().deleteById(deviceId);
  }
}
