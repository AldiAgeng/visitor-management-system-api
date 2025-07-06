import { ArticleRepository } from "../repositories/article.repository";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../utils/file.manipulate";
export class ArticleService {

  protected articleService;

  constructor(articleService: ArticleRepository) {
    this.articleService = articleService;
  }

  async list(query: any) {
    const article = await this.articleService.list(query);
    return article;
  }

  async show(id: number) {
    const article = await this.articleService.show(id);
    return article;
  }

  async create(article: any, image: any) {
    const result = await uploadImageToCloudinary(image, "articles");

    const articlePayload = {
      ...article,
      image_public_id: result.public_id,
      image: result.secure_url
    }

    const articles = await this.articleService.create(articlePayload);
    return articles;
  }

  async update(id: number, article: any, image: any) {
    const articleInDB = await this.articleService.show(id);

    if (articleInDB.image == null && !articleInDB.image_public_id == null) {
        const result = await uploadImageToCloudinary(article.image, "articles");

        const articlePayload = {
            ...article,
            image_public_id: result.public_id,
            image: result.secure_url
        };

        return await this.articleService.update(id, articlePayload);
    }

    await deleteImageFromCloudinary(articleInDB.image_public_id);

    const result = await uploadImageToCloudinary(image, "articles");

    const articlePayload = {
        ...article,
        image_public_id: result.public_id,
        image: result.secure_url
    };

    return await this.articleService.update(id, articlePayload);
  }
  async delete(id: number) {

    const articleInDB = await this.articleService.show(id);

    if (articleInDB.image && articleInDB.image_public_id) {
      await deleteImageFromCloudinary(articleInDB.image_public_id);

      return await this.articleService.delete(id);
    }

    return await this.articleService.delete(id);
  }
}