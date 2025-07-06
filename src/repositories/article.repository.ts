import { ArticlesModel } from "../databases/models/articles";

export class ArticleRepository {
  async list(query: any) {
    
    const { page, limit, filter, search, sort, order } = query;
    const queryBuilder = ArticlesModel.query();
    
    if (filter) {
      queryBuilder.where({
        approved: filter
      });
    }

    if (search) {
      queryBuilder.whereILike("title", "like", `%${search}%`).orWhereILike("body", "like", `%${search}%`);
    }

    if (sort) {
      if (order === "asc" || order === "desc") {
        queryBuilder.orderBy(sort, order);
      }
    }

    if (page && limit) {
      queryBuilder.offset((+page - 1) * +limit).limit(+limit);
    }

    return await queryBuilder;
  }

  async show(id: number) {
    const article = await ArticlesModel.query().findById(id).throwIfNotFound();
    return article;
  }

  async create(article: any) {
    const articles = await ArticlesModel.query().insert(article).returning("*");
    return articles;
  }

  async update(id: number, article: any) {
    const articles = await ArticlesModel.query()
      .where({ id })
      .patch(article)
      .throwIfNotFound()
      .returning("*");
    return articles;
  }

  async delete(id: number) {
    const articles = await ArticlesModel.query()
      .where({ id })
      .del()
      .throwIfNotFound()
      .returning("*");
    return articles;
  }
}