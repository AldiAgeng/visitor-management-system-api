import { Devices } from "../databases/models/devices";
import { DeviceRepository } from "../repositories/device.repository";

export class DeviceService {
  protected deviceRepository: DeviceRepository;

  constructor() {
    this.deviceRepository = new DeviceRepository();
  }

  async list() {
    return await this.deviceRepository.list();
  }

  async show(id: number) {
    return await this.deviceRepository.show({ id });
  }

  async create(device: Devices) {
    return await this.deviceRepository.create(device);
  }

  async delete(id: number) {
    return await this.deviceRepository.delete(id);
  }

  async update(id: number, device: Devices) {
    return await this.deviceRepository.update(id, device);
  }
}
