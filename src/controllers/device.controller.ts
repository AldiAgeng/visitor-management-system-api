import { Response, Request } from "express";

import { Devices } from "../databases/models/devices";
import { IParams } from "../interfaces/id.interface";
import { ResponseHelper } from "../helpers/response.helper";
import { DeviceService } from "../services/device.service";

export class DevicesController extends ResponseHelper {
  protected deviceService;

  constructor() {
    super();
    this.deviceService = new DeviceService();
  }

  async list(req: Request, res: Response) {
    try {
      const devices = await this.deviceService.list();

      return this.success("Data ditemukan", devices, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async create(req: Request<{}, {}, Devices>, res: Response) {
    try {
      const body = req.body;
      const device = await this.deviceService.create(body);
      return this.success("Data disimpan", device, 201)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async show(req: Request<IParams>, res: Response) {
    try {
      const { id } = req.params;
      const device = await this.deviceService.show(id ? parseInt(id) : 0);
      return this.success("Data ditemukan", device)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async delete(req: Request<IParams>, res: Response) {
    try {
      const { id } = req.params;
      await this.deviceService.delete(id ? parseInt(id) : 0);
      return this.success("Data dihapus")(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async update(req: Request<IParams, {}, Partial<Devices>>, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const device = await this.deviceService.update(
        id ? parseInt(id) : 0,
        body as Devices
      );
      return this.success("Data diubah", device, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }
}
