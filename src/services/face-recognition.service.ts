import { FaceRecognitionRepository } from '../repositories/face-recognition.repository';

export class FaceRecognitionService {
  protected faceRecognitionRepository: FaceRecognitionRepository;

  constructor() {
    this.faceRecognitionRepository = new FaceRecognitionRepository();
  }

  async list(data: any) {
    return await this.faceRecognitionRepository.list(data);
  }

  async show(id: number) {
    return [];
  }

  async create(data: any, image: any) {
      const fileBuffer = image.buffer;
      const fileBase64 = fileBuffer.toString('base64');

      const resultData = {
        ...data,
        img_base64: fileBase64
      }
      
    return await this.faceRecognitionRepository.create(resultData);
  }

  async info(data: any) {
    return await this.faceRecognitionRepository.info(data);
  }

  async listVisitorRecord(data: any) {
    return await this.faceRecognitionRepository.listVisitorRecord(data);
  }
}
