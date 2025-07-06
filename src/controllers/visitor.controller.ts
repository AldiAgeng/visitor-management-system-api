import { Response, Request } from "express";

import { IParams } from "../interfaces/id.interface";
import { ResponseHelper } from "../helpers/response.helper";
import { VisitorService } from "../services/visitor.service";
import { Visitors } from "../databases/models/visitors";

export class VisitorController extends ResponseHelper {
  protected visitorService;

  constructor() {
    super();
    this.visitorService = new VisitorService();
  }

  list = async (req: Request, res: Response) => {
    try {
      const visitors = await this.visitorService.list();

      return this.success("Data ditemukan", visitors, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  create = async (req: Request<{}, {}, Visitors>, res: Response) => {
    try {
      const body = req.body;
      const image = req.file;

      const device = await this.visitorService.create(body, image);

      return this.success("Data disimpan", device, 201)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 400)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  show = async (req: Request<IParams>, res: Response) => {
    try {
      const { id } = req.params;
      const visitor = await this.visitorService.show(id ? parseInt(id) : 0);
      return this.success("Data ditemukan", visitor)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  delete = async (req: Request<IParams>, res: Response) => {
    try {
      const { id } = req.params;
      await this.visitorService.delete(id ? parseInt(id) : 0);
      return this.success("Data dihapus")(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  update = async (req: Request<IParams, {}, Partial<Visitors>>, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const image = req.file;

      const device = await this.visitorService.update(
        id ? parseInt(id) : 0,
        body as Visitors,
        image
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
