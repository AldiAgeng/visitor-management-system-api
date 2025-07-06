import { VisitorRepository } from './../repositories/visitor.repository';
import { Visitors } from "../databases/models/visitors";
import { createHash } from 'crypto';

export class VisitorService {
  protected visitorRepository: VisitorRepository;

  constructor() {
    this.visitorRepository = new VisitorRepository();
  }

  async list() {
    return await this.visitorRepository.list();
  }

  async show(id: number) {
    return await this.visitorRepository.show({ id });
  }

  async create(visitor: Visitors, image: any) {
  const fileBuffer = image.buffer;
  const fileBase64 = fileBuffer.toString('base64');

  const nameMd5 = this.md5(visitor?.name?.toLowerCase() ?? '');
  const fileMd5 = this.md5(fileBuffer);
  const finalMd5 = this.md5(nameMd5 + fileMd5);

  visitor = {
    ...visitor,
    img_base64: fileBase64,
    md5: finalMd5
  };

  return await this.visitorRepository.create(visitor);
}

  async delete(id: number) {
    return await this.visitorRepository.delete(id);
  }

  async update(id: number, visitor: Visitors, image: any) {
    if (image) {
      const fileBuffer = image.buffer;
      const fileBase64 = fileBuffer.toString('base64');

      const nameMd5 = this.md5(visitor?.name?.toLowerCase() ?? '');
      const fileMd5 = this.md5(fileBuffer);
      const finalMd5 = this.md5(nameMd5 + fileMd5 + id);

      visitor = {
        ...visitor,
        img_base64: fileBase64,
        md5: finalMd5
      };
    }

    return await this.visitorRepository.update(id, visitor);
  }

  md5(input: string | Buffer): string {
    const inputString = typeof input === 'string' ? input : input.toString('utf8');
    return createHash('md5').update(inputString).digest('hex').toLowerCase();
  }
}
