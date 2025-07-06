import { Response, Request } from "express";

import { Articles } from "../databases/models/articles";
import { IParams } from "../interfaces/id.interface";
import { ResponseHelper } from "../helpers/response.helper";
import { ArticleService } from "../services/article.service";

export class ArticlesController extends ResponseHelper {

  protected articleService;

  constructor(articleService: ArticleService) {
    super();
    this.articleService = articleService;
  }

  async list(req: Request, res: Response) {
    try {
      const articles = await this.articleService.list(req.query);

      return this.success("Data ditemukan", articles, 200)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }
  
  async create(req: Request<{}, {}, Articles>, res: Response) {
    try {
      const body = req.body;
      const image = req.file;
      const article = await this.articleService.create(body, image);
      return this.success("Data disimpan", article, 201)(res);
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
      if(req.params.id === undefined){
        return this.error("Parameter id harus diisi", null, 400)(res);
      }
      const article = await this.articleService.show(+req.params.id);
      return this.success("Data ditemukan", article)(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }

  async update(req: Request<IParams, {}, Partial<Articles>>, res: Response) {
    try {
      if(req.params.id === undefined){
        return this.error("Parameter id harus diisi", null, 400)(res);
      }
      const body = req.body;
      const image = req.file;
      const id = +req.params.id;
      const articles = await this.articleService.update(id, body, image);
      return this.success("Data diubah", articles, 200)(res);
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
      if(req.params.id === undefined){
        return this.error("Parameter id harus diisi", null, 400)(res);
      }
      const id = +req.params.id;
      await this.articleService.delete(id);
      return this.success("Data dihapus")(res);
    } catch (error) {
      if (error instanceof Error) {
        return this.error(error.message, null, 404)(res);
      } else {
        return this.error("An unknown error occurred")(res);
      }
    }
  }
}
